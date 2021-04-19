<template>
  <div>
    <!--    面包屑导航-->
    <a-card>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <router-link to="/">首页</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="/forum">交流讨论</router-link>
        </a-breadcrumb-item>
        <!--        <a-breadcrumb-item><router-link :to="{path: '/forum/category', params:{goto:page.thread.categoryid}}">{{page.thread.categorytitle}}</router-link></a-breadcrumb-item>-->
        <a-breadcrumb-item>{{ page.thread.title }}</a-breadcrumb-item>
      </a-breadcrumb>
    </a-card>
    <!--    标题正文-->
    <h2 class="text-center">{{ page.thread.title }}</h2>
    <a-row>
      <a-col :span="8">
        <div class="small text-muted">作者：{{ page.thread.authorid }}</div>
      </a-col>
      <a-col :span="8">
        <div class="small text-muted">编辑时间：{{ moment(page.thread.modifytime, "YYYYMMDD").fromNow() }}</div>
      </a-col>
      <a-col :span="8">
        <div class="small text-muted">发布时间：{{ moment(page.thread.createtime, "YYYYMMDD").fromNow() }}</div>
      </a-col>
    </a-row>

    <div v-html="page.thread.content"></div>

    <!--    评论列表-->
    <hr>
    <a-list
        v-if="page.fmsComments.length" :data-source="page.fmsComments"
        :header="`${page.fmsComments.length} ${page.fmsComments.length > 1 ? 'replies' : 'reply'}`"
        item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment>
          <template slot="actions">
            <!--        赞同-->
            <span key="comment-basic-like">
        <a-tooltip title="赞同">
          <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like"/>
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">
          {{ item.agreecount }}
        </span>
      </span>
            <!--        反对-->
            <span key="comment-basic-dislike">
        <a-tooltip title="反对">
          <a-icon
              type="dislike"
              :theme="action === 'disliked' ? 'filled' : 'outlined'"
              @click="dislike"
          />
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">
          {{ item.disagreecount }}
        </span>
      </span>
          </template>
          <a slot="author">{{item.authorid}}</a>
          <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="avatar alt"
          />
          <p slot="content">
            {{item.content}}
          </p>
          <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ moment(item.createtime, 'YYYYMDD').fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>

    <!--发表评论-->
    <hr>
    <a-comment>
      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo"/>
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" v-model="content"/>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            添加评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>

  </div>
</template>

<script>
import {getThreadByThreadId, replyThread} from "@/api/forum";
import moment from 'moment'


export default {
  name: "Thread",
  data() {
    return {
      content: '',
      submitting: false,
      likes: 0,
      dislikes: 0,
      action: null,
      page: {
        fav: 0,
        liked: 0,
        views: 0,
        fmsComments: [],
        fmsThreadKmsKnowledgeList: [],
        thread: {
          authorid: 0,
          categoryid: 0,
          categoryintro: "",
          categorylogo: null,
          categorytitle: "",
          content: "",
          createtime: "2",
          enabled: 1,
          id: 16,
          modifytime: "",
          title: "",
          typeid: 1,
          typename: "",
        }
      }
    }
  },
  methods: {
    moment: moment,
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = 'liked';
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = 'disliked';
    },
    handleSubmit() {
      this.submitting = true;
      replyThread({
        threadId: this.$route.params.id,
        content: this.content
      }).then(res => {
        this.$notification.info({message: res.data.message})
      }).finally(() => this.submitting = false)
    }
  },
  mounted() {
    moment.locale('zh-cn')
    getThreadByThreadId(this.$route.params.id).then(res => {
      this.page = res.data
    })
  }
}
</script>

<style scoped>

</style>