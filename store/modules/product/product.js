const state = {
	product: {},
	num: '',
	sku: {},
	skuId: '',

	cartArray: [],
	cartProduct: [],

	cartNum: 0,
}
const mutations = {
	chooseProduct(state, payload) {
		state.product = payload.product;
		state.num = payload.num;
		state.sku = payload.sku;
		state.skuId = payload.skuId;
	},
	chooseCart(state, payload) {
		state.cartArray = payload.cartArray;
		state.cartProduct = payload.cartProduct;
	},
	//修改购物车数量
	changeCartNum(state, payload) {
		state.cartNum = payload.cartNum;
	}
}


export default {
	state,
	mutations
}
