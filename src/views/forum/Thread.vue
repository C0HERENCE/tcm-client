<template>
  <div>
    <!--    面包屑导航-->
    <a-card>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <router-link to="/">{{$t('views.thread.index')}}</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="/forum">{{$t('views.thread.talk')}}</router-link>
        </a-breadcrumb-item>
        <!--        <a-breadcrumb-item><router-link :to="{path: '/forum/category', params:{goto:page.thread.categoryid}}">{{page.thread.categorytitle}}</router-link></a-breadcrumb-item>-->
        <a-breadcrumb-item>{{ page.thread.title }}</a-breadcrumb-item>
      </a-breadcrumb>
    </a-card>
    <a-card>
      <!--    标题正文-->
      <h2 slot="title" class="text-center">{{ page.thread.title }}</h2>
      <a-row>
        <a-col :offset="8" :span="8">
          <div class="small text-muted float-right">{{$t('views.thread.last-edit')}}：{{ moment(page.thread.modifytime, "YYYYMMDD").fromNow() }}</div>
        </a-col>
        <a-col :span="8">
          <div class="small text-muted float-right">{{$t('views.thread.published-at')}}：{{ moment(page.thread.createtime, "YYYYMMDD").fromNow() }}</div>
        </a-col>
        <hr>
      </a-row>
      <div v-html="page.thread.content"></div>

      <div slot="actions" class="small text-muted float-right mr-3">
        {{$t('views.thread.author')}}
        <a-avatar :src="page.thread.avatar"></a-avatar>
        {{ page.thread.nickname }}
      </div>
    </a-card>


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
                <a-tooltip :title="$t('views.post.agg')">
                  <a-icon type="like" :theme="item.agreed === 1 ? 'filled' : 'outlined'" @click="likeAction(item, 'agree')"/>
                </a-tooltip>
                <span class="mx-1">{{ item.fmsComment.agreecount }}</span>
            </span>
            <!--        反对-->
            <span key="comment-basic-dislike">
              <a-tooltip :title="$t('views.post.dis')">
                <a-icon type="dislike" :theme="item.agreed === 0 ? 'filled' : 'outlined'" @click="disLikeAction(item, 'disagree')"/>
              </a-tooltip>
              <span class="mx-1">{{ item.fmsComment.disagreecount }}</span>
            </span>
          </template>
          <a slot="author">{{ item.nickname }}</a>
          <a-avatar slot="avatar" :src="item.avatar" alt="avatar alt"/>
          <p slot="content">
            {{ item.fmsComment.content }}
          </p>
          <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ moment(item.fmsComment.createtime, 'YYYYMDD').fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>

    <!--发表评论-->
    <hr>
    <a-comment>
      <a-avatar slot="avatar" :src="avatar" alt="Han Solo"/>
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" v-model="content"/>
        </a-form-item>
        <a-form-item>
          <kaptcha @valid="(e) => this.kaptcah = e"></kaptcha>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            {{$t('views.thread.add')}}
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
    <ABackTop></ABackTop>
  </div>
</template>

<script>
import {getThreadByThreadId, replyThread, actionComment} from "@/api/forum";
import {getAvatar} from "@/api/account";
import moment from 'moment'
import Kaptcha from "@/components/Kaptcha";


export default {
  name: "Thread",
  components: {Kaptcha},
  data() {
    return {
      content: '',
      submitting: false,
      page: {
        thread: {
          title: ""
        },
        fmsComments: []
      },
      avatar: '',
      kaptcah: ''
    }
  },
  methods: {
    moment: moment,
    likeAction(row) {
      if (row.agreed !== 1) {
        actionComment(row.fmsComment.id, 1).then(res=> {
          if (res.status === 200) {
            row.fmsComment.agreecount++; // 点赞
            if (row.agreed === 0)row.fmsComment.disagreecount--;
            row.agreed = 1
          }
        })
      } else {
        actionComment(row.fmsComment.id, -1).then(res => {
          if (res.status === 200) {
            row.agreed = -1; // 取消点赞
            row.fmsComment.agreecount--;
          }
        })
      }
    },
    disLikeAction(row) {
      if (row.agreed !== 0) {
        actionComment(row.fmsComment.id, 0).then(res => {
          if (res.status === 200) {
            row.fmsComment.disagreecount++; // 点踩
            if (row.agreed === 1)row.fmsComment.agreecount--;
            row.agreed = 0
          }
        })
      } else {
        actionComment(row.fmsComment.id, -1).then(res => {
          if (res.status === 200) {
            row.agreed = -1; // 取消点踩
            row.fmsComment.disagreecount--;
          }
        })
      }
    },
    loadThread() {
      getThreadByThreadId(this.$route.params.id).then(res => {
        if (res.status !== 200) {
          this.$message.error("你所查看的帖子不存在")
          this.$router.push("/forum/category")
        }
        else {
          this.page = res.data
        }
      }).then(() => {
        getAvatar().then(res => this.avatar = res.data);
      })
    },
    handleSubmit() {
      if (this.kaptcah !== true) {
        this.$message.error("验证码输入不正确")
        return;
      }
      if (this.content === "") {
        this.$message.error("请输入回复内容")
        return;
      }
      this.submitting = true;
      replyThread({
        threadId: this.$route.params.id,
        content: this.content
      }).then(res => {
        if (res.status === 200) {
          this.$notification.success({message: "Ok"});
          this.loadThread();
          this.content = ""
        } else {
          this.$notification.error({message: "Failed"});
        }
      }).finally(() => this.submitting = false)
    }
  },
  mounted() {
    moment.locale('zh-cn')
    this.loadThread();
  }
}
</script>

<style scoped>

</style>