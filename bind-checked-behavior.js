import registerBehavior from 'register-behavior';
import dispatchDataRequest from 'dispatch-data-request';
import resolveData from 'resolve-data';

export default registerBehavior('bind-checked', {
	prototype: {
		attachedCallback() {
			this.handleDataChange = this.handleDataChange.bind(this);

			this.descriptor = this.target.getAttribute('bind-checked');
			dispatchDataRequest(this.target, this.descriptor, true).then(dataRequest => {
				if (!this.detached) {
					this.updateChecked(dataRequest.value);

					this.source = dataRequest.source;
					this.source.addEventListener('datachange', this.handleDataChange);
				}
			});
		},

		detachedCallback() {
			this.detached = true;

			if (this.source) {
				this.source.removeEventListener('datachange', this.handleDataChange);
			}
		},

		updateChecked(value) {
			const checked = Boolean(value);

			if (this.target.checked !== checked) {
				this.target.checked = checked;
			}
		},

		handleDataChange(event) {
			let { value } = resolveData(this.source.model, this.descriptor);
			this.updateChecked(value);
		}
	}
});
