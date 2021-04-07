<template>
  <div>
    <div align="center">
      <v-text-field
        v-model="keyword"
        hide-details
        outlined
        class="mb-3"
        @keydown.enter="onSearch"
      />
      <p v-if="keyword.length>0">
        Result {{ items.length }}xxxx
      </p>
    </div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ol>
          <li v-for="(item,index) in items" :key="index">
            {{ item.index }}. <b style="font-weight:bold" class="question" v-html="item.ZQUESTIONCONTENT" />
            <p v-if="item.ZIMAGE" class="mt-3" align="center">
              <img width="300" :src="require('@/assets/b2/'+item.ZIMAGE)">
            </p>
            <ol class="ma-3">
              <li v-for="(child,childIndex) in item.options" v-if="child" :key="childIndex" :class="[childIndex+1===item.ZANSWERS?'answer':'']">
                {{ childIndex+1 }}. {{ child }}
              </li>
            </ol>
          </li>
        </ol>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {

  }
})
export default class MyStore extends Vue {
  title:string='demo1';
  keyword:string='';
  items:Array<any> = [];
  itemsClone:Array<any> = [];

  public getData (): void {
    this.$axios.get(`${window.location}/ZQUESTION.json?timestamp=${new Date().getTime()}`)
    // this.$axios.get(`/ZQUESTION.json?timestamp=${new Date().getTime()}`)
      .then((response) => {
        const rs = response.data
        rs.forEach((element:any, index:number) => {
          element.options = [element.ZOPTION1, element.ZOPTION2, element.ZOPTION3, element.ZOPTION4]
          element.ZQUESTIONCONTENT_NO_ACCENT = this.nonAccentVietnamese(element.ZQUESTIONCONTENT)
          element.index = index + 1
        })
        this.items = rs
        this.itemsClone = JSON.parse(JSON.stringify(this.items))
      })
      .catch(() => {
      })
  }

  nonAccentVietnamese (str:string):string {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
    return str
  }

  onSearch ():void {
    if (this.keyword.length < 3 && this.keyword.length > 0) {
      return
    }
    this.items = []
    this.itemsClone.forEach((e) => {
      const x = { ...e }
      if (x.ZQUESTIONCONTENT.search(this.keyword) > -1 || x.ZQUESTIONCONTENT_NO_ACCENT.search(this.keyword) > -1) {
        let pos = x.ZQUESTIONCONTENT.search(this.keyword)
        if (pos === -1) {
          pos = x.ZQUESTIONCONTENT_NO_ACCENT.search(this.keyword)
        }
        x.ZQUESTIONCONTENT = this.insert(pos, x.ZQUESTIONCONTENT, '<mark>')
        x.ZQUESTIONCONTENT = this.insert(pos + this.keyword.length + 6, x.ZQUESTIONCONTENT, '</mark>')
        // x.ZQUESTIONCONTENT = x.ZQUESTIONCONTENT.replaceAll(this.keyword, `<mark>${this.keyword}</mark>`)

        this.items.push(x)
      }
    })
    /* this.items = this.items.filter(x => x.ZQUESTIONCONTENT.search(this.keyword) > -1 || x.ZQUESTIONCONTENT_NO_ACCENT.search(this.keyword) > -1)
    this.items.forEach((element) => {
      element.ZQUESTIONCONTENT = element.ZQUESTIONCONTENT.replaceAll(this.keyword, `<mark>${this.keyword}</mark>`)
    }) */
  }

  insert (index:number, str:string, value:string):string {
    return str.substr(0, index) + value + str.substr(index)
  }

  created () {
    // alert(this.insert(3, 'ab de e', '123'))
    this.getData()
  }
}
</script>

<style scoped>
ul,li{
  list-style-type: none;
  font-weight: 100;
}
.answer{
  font-weight: bold;
  color: cadetblue;
}

</style>
