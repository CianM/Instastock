import Vue from "vue";
import Vuex from "vuex";

import { actions, ActionTypes } from "./actions";
import { getters, GetterTypes } from "./getters";
import { mutations, MutationTypes } from "./mutations";
import { state, AppState } from "./state";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	strict: debug
});

export { ActionTypes, GetterTypes, MutationTypes, AppState };
