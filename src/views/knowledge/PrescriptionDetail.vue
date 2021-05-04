<template>
  <div>
    <div v-if="prescription['0'] === undefined" class="text-center">
      <a-spin size="large" />
    </div>
    <div v-else>
      <FeedbackModal index="prescriptions" :anchor="feedBackAnchor" :visible="showFeedback"
                     @onCloseModal="showFeedback=false" :esId="this.$route.params.id"></FeedbackModal>
      <a-row>
        <a-card class="p-2">
          <div class="row">
            <div class="col-8">
              <h1 v-html="prescription['0'].name + ' '"></h1>
              <p v-html="prescription['0'].intro"></p>
              <a-row>
                <a-col :span="(j!=='id' && (j==='chinesePinyin' || j==='aliasName' || j === 'remark' || j==='origin'))?24:0" v-for="(i, j) in prescription['0']" :key="i">
                  <template v-if="j!=='id' && j!=='thumb' && i">
                    <span style="font-weight: bold" v-html="prescriptionString(j) + ' ' + j"></span>:
                    <span class="text-muted">{{i}}</span>
                  </template>
                </a-col>
              </a-row>
              <a-space>
                <a-button type="primary"
                          @click="$router.push({name: 'ForumCategory', params: {q: `topic:${prescription['0'].name}`}})">
                  <a-icon type="message"></a-icon>
                  相关讨论
                </a-button>
              </a-space>
            </div>
            <img class="col-4" :src="prescription['0'].thumb" alt="">
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
          <a-card v-for="(v,k) in prescription" :key="k">
            <template v-if="k !== '0' && v.show">
              <a-button slot="extra" type="link"
                        @click="() => {showFeedback = true; feedBackAnchor=k}">
                <a-icon key="edit" type="edit"/>
                {{ $t('views.kb.feedback')}}
              </a-button>
              <h4 slot="title" :id="k">{{prescriptionString(k)}}</h4>
              <div v-for="(v2, k2) in v" :key="k2">
                <template v-if="v2 && k2!=='show'">
                  <h5 :id="k2">{{prescriptionString(k2)}}</h5>
                  <p v-html="v2"></p>
                </template>
              </div>
            </template>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-anchor @change="anchorChange">
            <a-anchor-link v-for="(v,k) in prescription" :key="k" :href="'#'+k" :title="prescriptionString(k)">
              <template v-if="currentAnchor !== '' && currentAnchor === '#'+k && k!=='0'">
                <a-anchor-link v-for="(v2, k2) in v" :key="k2" :href="'#'+k2">
              <span slot="title" v-if="v2 && k2!=='show'">
                {{prescriptionString(k2).toUpperCase()}}
              </span>
                </a-anchor-link>
              </template>
            </a-anchor-link>
          </a-anchor>
        </a-col>
      </a-row>
      <a-back-top />
    </div>
  </div>
</template>

<script>
import {getPrescriptionRelated, getPrescriptionById} from "@/api/knowledge";
import {prescriptionConvert, prescriptionString, searchResultConvert} from "@/utils/convert";
import FeedbackModal from "@/components/FeedbackModal";
import Visualization from "@/components/Visualization";

export default {
  name: "PrescriptionDetail",
  components: {FeedbackModal, Visualization},
  data() {
    return {
      prescription: {},
      currentAnchor: '',
      showFeedback: false,
      feedBackAnchor: '',
      related: [],
      center:{},
    }
  },
  methods: {
    anchorChange(link) {
      if (link.length > 3) return;
      this.currentAnchor = link
    },
    prescriptionString
  },
  mounted() {
    getPrescriptionById(this.$route.params.id).then(res => {
      this.prescription = prescriptionConvert(res.data);
      for (let k in this.prescription) {
        let show = false;
        for (let s in this.prescription[k]) {
          if (this.prescription[k][s] !== null && this.prescription[k][s]!==undefined &&this.prescription[k][s]!==''){
            show = true;
            break;
          }
        }
        this.prescription[k].show = show;
      }
    }).then(()=>{
      this.center={id: 0, name: this.prescription['0'].name, url: ''}
      let d = []
      getPrescriptionRelated(this.prescription['0'].name).then(x=>{
        for (let i = 0; i < x.data.length; i++) {
          x.data[i].highlighter = {name:''}
          d.push(searchResultConvert(x.data[i]))
        }
        console.log(d)
        this.related = d;
      })
    })
  }
}
</script>

<style scoped>

</style>