export default {
    template: `
       <section class="car-filter">
        <label> Search a car: </label>    
        <input type="text" @input="setFilterBy(-1)" v-model="filterBy.name">
        <input type="number" @input="setFilterBy(0)" v-model="filterBy.fromPrice">
        <input type="number" @input="setFilterBy(1)" v-model="filterBy.toPrice">
    </section>
    `,
    data(){
        return {
            filterBy: {
                name: '',
                fromPrice: 0,
                toPrice: 350
            }
        }
    },
    methods: {
        setFilterBy(mode){
            if(mode === -1) this.$emit('filteredBy', this.filterBy.name, mode)
            if(mode === 0) this.$emit('filteredBy', this.filterBy.fromPrice, mode)
            if(mode === 1) this.$emit('filteredBy', this.filterBy.toPrice, mode)
            
        }
    }
}