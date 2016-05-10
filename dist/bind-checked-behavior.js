(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'register-behavior', 'dispatch-data-request', 'resolve-data'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('register-behavior'), require('dispatch-data-request'), require('resolve-data'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.registerBehavior, global.dispatchDataRequest, global.resolveData);
		global.bindCheckedBehavior = mod.exports;
	}
})(this, function (exports, _registerBehavior, _dispatchDataRequest, _resolveData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _registerBehavior2 = _interopRequireDefault(_registerBehavior);

	var _dispatchDataRequest2 = _interopRequireDefault(_dispatchDataRequest);

	var _resolveData2 = _interopRequireDefault(_resolveData);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	exports.default = (0, _registerBehavior2.default)('bind-checked', {
		prototype: {
			attachedCallback: function attachedCallback() {
				var _this = this;

				this.handleDataChange = this.handleDataChange.bind(this);

				this.descriptor = this.target.getAttribute('bind-checked');
				(0, _dispatchDataRequest2.default)(this.target, this.descriptor, true).then(function (dataRequest) {
					if (!_this.detached) {
						_this.updateChecked(dataRequest.value);

						_this.source = dataRequest.source;
						_this.source.addEventListener('datachange', _this.handleDataChange);
					}
				});
			},
			detachedCallback: function detachedCallback() {
				this.detached = true;

				if (this.source) {
					this.source.removeEventListener('datachange', this.handleDataChange);
				}
			},
			updateChecked: function updateChecked(value) {
				var checked = Boolean(value);

				if (this.target.checked !== checked) {
					this.target.checked = checked;
				}
			},
			handleDataChange: function handleDataChange(event) {
				var value = (0, _resolveData2.default)(this.source.model, this.descriptor).value;
				this.updateChecked(value);
			}
		}
	});
});
