<template>
  <div>
    <div v-if="herb['0'] === undefined" class="text-center">
      <a-spin size="large"/>
    </div>
    <div v-else>
      <FeedbackModal index="herbs_info_v2" :anchor="feedBackAnchor" :visible="showFeedback"
                     @onCloseModal="showFeedback=false" :esId="this.$route.params.id"></FeedbackModal>
      <a-row>
        <a-card class="p-2">
          <div class="row">
            <div class="col-8">
              <h1>{{ herb['0'].chineseName }} {{ herb['0'].latinName}}</h1>
              <p v-html="herb['0'].intro"></p>
              <a-row>
                <a-col :span="(j!=='id' && j!=='picturepath' && j!=='intro' && j!=='thumbnail')?24:0"
                       v-for="(i, j) in herb['0']" :key="j">
                  <template v-if="j!=='id' && j!=='thumb' && j!=='show' && i">
                    <span style="font-weight: bold">{{ herbString(j) }} {{ j }}</span>:
                    <span class="text-muted">{{ i }}</span>
                  </template>
                </a-col>
              </a-row>
              <a-space>
                <a-button type="primary"
                          @click="$router.push({name: 'ForumCategory', params: {q: `topic:${herb['0'].chineseName}`}})">
                  <a-icon type="message"></a-icon>
                  相关讨论
                </a-button>
              </a-space>
            </div>
            <img class="col-4" :src="herb['0'].thumbnail" alt="">
          </div>
        </a-card>
      </a-row>
      <a-row v-if="related.length > 0">
        <a-card title="相关知识图谱">
          <Visualization :center="center" :related="related"></Visualization>
        </a-card>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="18">
          <a-card v-for="(v,k) in herb" :key="k">
            <template v-if="k!=='0' && v.show">
              <a-button slot="extra" type="link"
                        @click="() => {showFeedback = true; feedBackAnchor=k}">
                <a-icon key="edit" type="edit"/>
                {{ $t('views.kb.feedback')}}
              </a-button>
              <h3 slot="title" :id="k">{{ herbString(k) }}</h3>
              <div v-for="(v2, k2) in v" :key="k2">
                <template v-if="!!v2 && k2!=='show'">
                  <h4 :id="k2">{{ herbString(k2) }}</h4>
                  <p v-html="v2"></p>
                </template>
                <hr>
              </div>
            </template>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-anchor @change="anchorChange">
            <a-anchor-link v-for="(v,k) in herb" :key="k" :href="'#'+k" :title="herbString(k)">
              <template v-if="currentAnchor !== '' && currentAnchor === '#'+k && k!=='0' && k!=='show'">
                <a-anchor-link v-for="(v2, k2) in v" :key="k2" :href="'#'+k2">
                 <span slot="title" v-if="v2 && k2!=='show'">
                  {{ herbString(k2) }}
                </span>
                </a-anchor-link>
              </template>
            </a-anchor-link>
          </a-anchor>
        </a-col>
      </a-row>
      <a-back-top/>
    </div>
  </div>
</template>

<script>
import {getHerbById, getHerbRelated} from "@/api/knowledge";
import {herbConvert, herbString, searchResultConvert} from "@/utils/convert";
import FeedbackModal from "@/components/FeedbackModal";

import Visualization from "@/components/Visualization";

export default {
  name: "HerbDetail",
  components: {FeedbackModal,Visualization},
  data() {
    return {
      herb: {},
      currentAnchor: '',
      showFeedback: false,
      feedBackAnchor: '',
      related: [],
      center:{},
    }
  },
  methods: {
    anchorChange(link) {
      if (link.length > 3 && link !== "") return;
      this.currentAnchor = link
    },
    herbString
  },
  mounted() {
    getHerbById(this.$route.params.id).then(res => {
      this.herb = herbConvert(res.data);
      for (let k in this.herb) {
        let show = false;
        for (let s in this.herb[k]) {
          if (this.herb[k][s] !== null && this.herb[k][s] !== undefined && this.herb[k][s] !== '') {
            show = true;
            break;
          }
        }
        this.herb[k].show = show;
      }
    }).then(()=>{
      this.center={id: 0, name: this.herb['0'].chineseName, url: ''}
      let d = []
      getHerbRelated(this.herb['0'].chineseName).then(x=>{
        for (let i = 0; i < x.data.length; i++) {
          x.data[i].highlighter = {name:''}
          d.push(searchResultConvert(x.data[i]))
        }
        this.related = d;
      })
    })
  }
}
</script>

<style scoped>

</style>