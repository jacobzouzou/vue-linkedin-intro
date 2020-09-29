//global component: no need declaration in parent component
Vue.component("asteroids-grid", {
    template:`
    <div class="container">
    <div class="card mt-5">
        <h2 class="card-header">
        <transition name="spin" appear>
            <span style="display:inline-block">{{header}}</span>
        </transition>
        </h2>
        <transition name="shooting-star">
            <div class="m-3" v-cloak v-if="asteroidsNumber > 0 && showsummary">
                <p>showing {{asteroidsNumber}} items</p>
                <p>{{closestObject}} has the shortest miss distance</p>
            </div>
        </transition>
        <div class="m-3">
            <a href="#" @click="showsummary = !showsummary">
                <span v-if="!showsummary">Show</span>
                <span v-if="showsummary">Hide</span>
                summary
            </a>
        </div>
        <table class="table table-striped" :class="['table-striped', {'table-dark':true}, 'table-bordered']">
            <thead class="thead-light">
                <th>#</th>
                <th>Name</th>
                <th>Close Approach Date</th>
                <th>Miss Distance</th>
                <th></th>
            </thead>
            <!-- <tbody v-cloak>
                <tr v-for="(a,index) in asteroids" :key="a.neo_reference_id"
                    :style="[getRowStyle(a), {color: 'blue'}]" style="color:green">
                    <td>{{index+1}}</td>
                    <td>{{a.name}}</td>
                    <td>{{getCloseApproachDate(a)}}</td>
                    <td>
                        <ul v-if="a.close_approach_data.length>0">
                            <li v-for="(value, key, index) in a.close_approach_data[0].miss_distance">
                                {{key}}: {{value}}
                            </li>
                        </ul>
                    </td>
                    <td><button @click="remove(index)" class="btn btn-warning">Remove</button></td>
                </tr>
            </tbody> -->
            <tbody is="transition-group" name="neo-list" v-cloak>
                <tr v-for="(a,index) in asteroids" :key="a.neo_reference_id"
                    :class="{highlight:isMissingData(a), 'shadow-sm': true}">
                    <td>{{index+1}}</td>
                    <td>{{a.name}}</td>
                    <td>{{getCloseApproachDate(a)}}</td>
                    <td>
                        <ul v-if="a.close_approach_data.length>0">
                            <li v-for="(value, key) in a.close_approach_data[0].miss_distance" :key="key">
                                {{key}}: {{value}}
                            </li>
                        </ul>
                    </td>
                    <td><button @click="remove(index)" class="btn btn-warning">Remove</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    `,
    props:["asteroids", "header"],
    data() {
        return {
            showsummary: true
        }
    },

    computed: {
        asteroidsNumber() {
            return this.asteroids.length;
        },
        closestObject() {
            var neosHavingData = this.asteroids.filter(function (neo) {
                return neo.close_approach_data.length > 0;
            });
            var simpleNeos = neosHavingData.map(function (neo) {
                return {
                    name: neo.name,
                    miles: neo.close_approach_data[0].miss_distance_miles
                };
            });
            var sortedNeos = simpleNeos.sort(function (a, b) {
                return a.miles - b.miles;
            });

            return sortedNeos[0].name;
        }

    },
    methods: {
        getCloseApproachDate: function (a) {
            if (a.close_approach_data.length > 0) {
                return a.close_approach_data[0].close_approach_date;
            }
            return "N/A";
        },
        remove(index) {
            this.$emit("remove",index);
        },
        getRowStyle(a) {
            if (a.close_approach_data.length === 0) {
                return {
                    border: 'solid 3px red',
                    color: 'red'
                }
            }
        },
        isMissingData(a) {
            return a.close_approach_data.length === 0;
        }
    }
});

