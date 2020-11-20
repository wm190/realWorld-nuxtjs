<template>
  <div>
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img :src="profile.image" class="user-img" />
              <h4>{{ profile.username }}</h4>
              <p>{{ profile.bio }}</p>
              <button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp;
                Follow Eric Simons
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    exact
                    class="nav-link" 
                    :class="{active: !tab}"
                    :to="{
                      name: 'profile'
                    }"
                  >
                    My Articles
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link 
                    exact
                    class="nav-link" 
                    :class="{active: tab}"
                    :to="{
                      name: 'profile',
                      query: {
                        tab: 'favorites'
                      }
                    }"
                  >
                    Favorited Articles
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div 
              class="article-preview"
              v-for="article in articles"
              :key="article.slug">
              <div class="article-meta">
                <a href>
                  <img :src="article.author.image" />
                </a>
                <div class="info">
                  <a href class="author">{{ article.author.username }}</a>
                  <span class="date">{{ article.createdAt | date('MMM DD,YYYY') }}</span>
                </div>
                <button 
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{'active': article.favorited}"
                  :disabled="article.favoriteDisabled"
                  @click="onFavorite(article)"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link :to="{
                  name: 'article',
                  params: {
                    slug: article.slug
                  }
                }" class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
                <ul class="tag-list">
                  <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
                    {{ tag }}
                  </li>
                </ul>
              </nuxt-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, addFavorite, deleteFavorite } from '@/api/article'
import { getProfile } from '@/api/user'
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  watchQuery: ['tab'],
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      profile: {}
    }
  },
  methods: {
    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  },
  async asyncData ({ params, query }) {
    let tab = query.tab || ''
    const { username } = params
    let param = {}
    if (tab) {
      // 作者关注的
      param.favorited = username
    } else {
      // 作者的文章
      param.author = username
    }
    const { data } = await getArticles(param)
    const { articles } = data
    articles.forEach(article => {
      article.favoriteDisabled = false
    })
    return {
      articles: articles,
      tab
    }
  },
  async mounted () {
    const { data } = await getProfile(this.$route.params.username)
    this.profile = data.profile
  }
};
</script>

<style lang='less' scoped>
</style>
