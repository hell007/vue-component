import CustomPicker from './picker.vue'

const Picker = {
	install: function(Vue, options) {
		Vue.component(CustomPicker.name, CustomPicker)
	}
}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Picker)
}

export default CustomPicker
