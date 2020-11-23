<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form >
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model="article.title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="What's this article about?" 
                    v-model="article.description"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="article.body"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags" v-model="tagList"/>
                  <div class="tag-list" v-if="isEdit">
                    <!-- 编辑 -->
                    <span class="tag-default tag-pill" v-for="tag in article.tagList" :key="tag">
                      <i class="ion-close-round" @click="removeTag(tag)"></i>
                      {{tag}}
                    </span>
                  </div>
                </fieldset>
                <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onSubmit">Publish Article</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArtile, updateArticle } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前会先执行中间件
  middleware: 'authenticated',
  computed: {
    isEdit () {
      return !!this.$route.params.slug
    }
  },
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tagList: ''
    };
  },
  methods: {
    async onSubmit () {
      this.tagList = this.tagList && this.tagList.split(',')
      if (this.isEdit) {
        this.article.tagList = this.article.tagList.concat(this.tagList)
        await updateArticle({ 
          slug: this.$route.params.slug, 
          data: { article: this.article }
        })
      } else {
        this.article.tagList = this.tagList
        await createArticle({ article: this.article })
      }
      this.$router.push(`/article/${this.$route.params.slug}`)
    },
    removeTag (tag) {
      this.article.tagList.splice(this.article.tagList.findIndex(item => item === tag), 1)
    }
  },
  async asyncData ({ params}) {
    if (params.slug) {
      // 编辑
      const { data } = await getArtile(params.slug)
      const { article } = data
      return { article }
    }
  }
};
</script>

<style lang='less' scoped>
</style>
