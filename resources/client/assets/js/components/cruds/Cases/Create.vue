<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Cases</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <form @submit.prevent="submitForm">
                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">Create</h3>
                            </div>

                            <div class="box-body">
                                <back-buttton></back-buttton>
                            </div>

                            <bootstrap-alert />

                            <div class="box-body">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="name"
                                            placeholder="Enter Name"
                                            :value="item.name"
                                            @input="updateName"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="opening_balance">Opening Balance</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="opening_balance"
                                            placeholder="Enter Opening Balance"
                                            :value="item.opening_balance"
                                            @input="updateOpening_balance"
                                            >
                                </div>
                                <!-- <div class="form-group">
                                    <label for="current_balance">Current Balance</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="current_balance"
                                            placeholder="Enter Current Balance"
                                            :value="item.current_balance"
                                            @input="updateCurrent_balance"
                                            >
                                </div> -->
                            </div>

                            <div class="box-footer">
                                <vue-button-spinner
                                        class="btn btn-primary btn-sm"
                                        :isLoading="loading"
                                        :disabled="loading"
                                        >
                                    Save
                                </vue-button-spinner>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </section>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            // Code...
        }
    },
    computed: {
        ...mapGetters('CasesSingle', ['item', 'loading']),
    },
    created() {
    },
    destroyed() {
        this.resetState()
    },
    methods: {
        ...mapActions("CasesSingle", [ 
        "storeData", 
        "resetState", 
        "setName", 
        "setOpening_balance", 
        "setCurrent_balance"]),
        updateName(e) {
            this.setName(e.target.value)
        },
        updateOpening_balance(e) {
            this.setOpening_balance(e.target.value)
            this.setCurrent_balance(e.target.value)
        },
        submitForm() {
            this.storeData()
                .then(() => {
                    this.$router.push({ name: 'cases.index' })
                    this.$eventHub.$emit('create-success')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}
</script>


<style scoped>

</style>
