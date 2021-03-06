function initialState() {
    return {
        item: {
            name: null,
            code: null,
            buy_code: null,
            sell_code: null,
            buy_rate_from: null,
            buy_rate_to: null,
            sell_rate_from: null,
            sell_rate_to: null,
            opening_balance: null,
            current_balance: null,
            opening_avg_rate: null,
            last_avg_rate: null,
            calc_type: null,
            bs_amount_dec_limit: null,
            avg_rate_dec_limit: null,
            balance_dec_limit: null,
            last_avg_rate_dec_limit: null,
            flag_img: null
        },
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
}

const actions = {
    storeData({ commit, state, dispatch }) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.item)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            Object.keys(params).forEach(function (key) {
                if (params[key] !== null)
                    formData.append(key, params[key]);
            });
            axios.post('/api/v1/currency', formData, config)
                .then(response => {
                    commit('resetState')
                    resolve()
                })
                .catch(error => {
                    let message = error.response.data.message || error.message
                    let errors = error.response.data.errors

                    dispatch(
                        'Alert/setAlert', {
                            message: message,
                            errors: errors,
                            color: 'danger'
                        }, {
                            root: true
                        })

                    reject(error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })
    },
    updateData({ commit, state, dispatch }) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.item)
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            let formData = new FormData();
            formData.append("_method", "PATCH");
            Object.keys(params).forEach(function (key) {
                if(params[key] !== null)
                    formData.append(key, params[key]);
            });
            axios.post('/api/v1/currency/' + params.id, formData, config)
                .then(response => {
                    console.log(response)
                    commit('setItem', response.data.data)
                    resolve()
                })
                .catch(error => {
                    let message = error.response.data.message || error.message
                    let errors  = error.response.data.errors

                    dispatch(
                        'Alert/setAlert',
                        { message: message, errors: errors, color: 'danger' },
                        { root: true })

                    reject(error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })
    },
    fetchData({ commit, dispatch }, id) {
        axios.get('/api/v1/currency/' + id)
            .then(response => {
                commit('setItem', response.data.data)
            })
    },
    setFlagImage({ commit }, value) {
        commit('setFlagImage', value)
    },
    setName({ commit }, value) {
        commit('setName', value)
    },
    setCode({ commit }, value) {
        commit('setCode', value)
    },
    setBuyCode({ commit }, value) {
        commit('setBuyCode', value)
    },
    setSellCode({ commit }, value) {
        commit('setSellCode', value)
    },
    setBuyRateFrom({ commit }, value) {
        commit('setBuyRateFrom', value)
    },
    setBuyRateTo({ commit }, value) {
        commit('setBuyRateTo', value)
    },
    setSellRateFrom({ commit }, value) {
        commit('setSellRateFrom', value)
    },
    setSellRateTo({ commit }, value) {
        commit('setSellRateTo', value)
    },
    setOpeningBalance({ commit }, value) {
        commit('setOpeningBalance', value)
    },
    setCurrentBalance({ commit }, value) {
        commit('setCurrentBalance', value)
    },
    setOpeningAverageRate({ commit }, value) {
        commit('setOpeningAverageRate', value)
    },
    setLastAverageRate({ commit }, value) {
        commit('setLastAverageRate', value)
    },
    setCalculateType({ commit }, value) {
        commit('setCalculateType', value)
    },
    setBSAmountDecLimit({ commit }, value) {
        commit('setBSAmountDecLimit', value)
    },
    setAverageRateDecLimit({ commit }, value) {
        commit('setAverageRateDecLimit', value)
    },
    setBalanceDecLimit({ commit }, value) {
        commit('setBalanceDecLimit', value)
    },
    setLastAverageRateDecLimit({ commit }, value) {
        commit('setLastAverageRateDecLimit', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, item) {
        state.item = item
    },
    setFlagImage(state, value) {
        state.item.flag_img = value
    },
    setName(state, value) {
        state.item.name = value
    },
    setCode(state, value) {
        state.item.code = value
    },
    setBuyCode(state, value) {
        state.item.buy_code = value
    },
    setSellCode(state, value) {
        state.item.sell_code = value
    },
    setBuyRateFrom(state, value) {
        state.item.buy_rate_from = value
    },
    setBuyRateTo(state, value) {
        state.item.buy_rate_to = value
    },
    setSellRateFrom(state, value) {
        state.item.sell_rate_from = value
    },
    setSellRateTo(state, value) {
        state.item.sell_rate_to = value
    },
    setOpeningBalance(state, value) {
        state.item.opening_balance = value
    },
    setCurrentBalance(state, value) {
        state.item.current_balance = value
    },
    setOpeningAverageRate(state, value) {
        state.item.opening_avg_rate = value
    },
    setLastAverageRate(state, value) {
        state.item.last_avg_rate = value
    },
    setCalculateType(state, value) {
        state.item.calc_type = value
    },
    setBSAmountDecLimit(state, value) {
        state.item.bs_amount_dec_limit = value
    },
    setAverageRateDecLimit(state, value) {
        state.item.avg_rate_dec_limit = value
    },
    setBalanceDecLimit(state, value) {
        state.item.balance_dec_limit = value
    },
    setLastAverageRateDecLimit(state, value) {
        state.item.last_avg_rate_dec_limit = value
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
