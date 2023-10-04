import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

const useArticleStore = defineStore('article', () => {
  const articleInfo: Ref<any> = ref(null)

  const setArticleInfo = (articleData: any) => {
    articleInfo.value = articleData
  }

  return { setArticleInfo, articleInfo }
})

export default useArticleStore
