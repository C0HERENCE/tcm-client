<template>
  <div>
    <div v-if="disease['0'] === undefined" class="text-center">
      <a-spin size="large"/>
    </div>
    <div v-else>
      <FeedbackModal index="disease" :anchor="feedBackAnchor" :visible="showFeedback"
                     @onCloseModal="showFeedback=false" :esId="this.$route.params.id"></FeedbackModal>
      <a-row>
        <a-card class="p-2">
          <div class="row">
            <div class="col-8">
              <h1 v-html="disease['0'].chineseName"></h1>
              <p v-html="disease['0'].introduction"></p>
              <a-row>
                <a-col :span="(j!=='id' && j!=='introduction')?24:0" v-for="(i, j) in disease['0']" :key="i">
                  <template v-if="j!=='id' && j!=='thumbnail' && j!=='show' && i">
                    <span style="font-weight: bold">{{ symptomString(j) }}{{ j }}</span>:
                    <span class="text-muted">{{ i }}</span>
                  </template>
                </a-col>
              </a-row>
              <a-space>
                <a-button type="primary"
                          @click="$router.push({name: 'ForumCategory', params: {q: `topic:${disease['0'].chineseName}`}})">
                  <a-icon type="message"></a-icon>
                  相关讨论
                </a-button>
              </a-space>
            </div>
            <img class="col-4" :src="disease['0'].thumbnail" alt="">
          </div>
        </a-card>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="18">
          <a-card v-for="(v,k) in disease" :key="k">
            <template v-if="v.show && k!=='0'">
              <h4 slot="title" :id="k">{{ symptomString(k) }}</h4>
              <a-button slot="extra" type="link"
                        @click="() => {showFeedback = true; feedBackAnchor=k}">
                <a-icon key="edit" type="edit"/>
                {{ $t('views.kb.feedback')}}
              </a-button>
              <template>
                <div v-for="(v2, k2) in v" :key="k2">
                  <template v-if="v2 && k2!=='show'">
                    <h5 :id="k2">{{ symptomString(k2)}}</h5>
                    <p v-html="v2"></p>
                  </template>
                </div>
              </template>
            </template>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-anchor @change="anchorChange">
            <a-anchor-link v-for="(v,k) in disease" :key="k" :href="'#'+k" :title="symptomString(k)">
              <template v-if="currentAnchor !== '' && currentAnchor === '#'+k">
                <a-anchor-link v-for="(v2, k2) in v" :key="k2" :href="'#'+k2" :title="symptomString(k2)">
                  <span v-show="v2 && k2!=='show'" slot="title"></span>
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
import {symptomConvert, symptomString} from "@/utils/convert";
import {getSymptomById} from "@/api/knowledge";
import FeedbackModal from "@/components/FeedbackModal";

export default {
  name: "SymptomDetail",
  components: {FeedbackModal},
  data() {
    return {
      disease: {},
      currentAnchor: '',
      showFeedback: false,
      feedBackAnchor: ''
    }
  },
  methods: {
    anchorChange(link) {
      if (link.length > 3) return;
      this.currentAnchor = link
    },
    symptomString
  },
  mounted() {
    getSymptomById(this.$route.params.id).then(res => {
      this.disease = symptomConvert(res.data);
      console.log(this.disease)
      for (let k in this.disease) {
        let show = false;
        for (let s in this.disease[k]) {
          if (this.disease[k][s] !== null && this.disease[k][s] !== undefined && this.disease[k][s] !== '') {
            show = true;
            break;
          }
        }
        this.disease[k].show = show;
      }
    })
  }
}
</script>

<style scoped>

</style>