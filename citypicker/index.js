import CustomCityPicker from './city-picker.vue'

const CityPicker = {
	install: function(Vue, options) {
		Vue.component(CustomCityPicker.name, CustomCityPicker)
	}
}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(CityPicker)
}

export default CustomCityPicker
