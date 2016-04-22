'use strict';
var mapper = function (x) {
	return x();
};

var handle = function (promises, concurrency) {
	var current = 0;
	var ret = [];

	function next(index) {
		if (current > promises.length) {
			return;
		}

		return promises[index]().then(function (result) {
			ret[index] = result;
			return next(current++);
		});
	}

	var list = [];

	for (var i = 0; i < concurrency; i++) {
		list.push(next(current++));
	}

	return Promise.all(list).then(function () {
		return ret;
	});
};

module.exports = function (promises, concurrency) {
	if (!Array.isArray(promises)) {
		return Promise.reject(new TypeError('Expected an array of promise functions'));
	}

	concurrency = concurrency || 0;

	if (concurrency === 0 || concurrency >= promises.length) {
		return Promise.all(promises.map(mapper));
	}

	return handle(promises, concurrency);
};
