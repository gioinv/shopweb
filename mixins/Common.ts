import { Component, Vue } from 'nuxt-property-decorator'
import Constants from '~/utils/Constants'
@Component({

})
class Form extends Vue {
  form:object | undefined;
  formClone:object | undefined;
  isProcessing:boolean = false;

  get isChangedModel ():boolean {
    return JSON.stringify(this.form) !== JSON.stringify(this.formClone)
  }

  cloneForm () {
    this.formClone = JSON.parse(JSON.stringify(this.form))
  }

  resetForm () {
    this.form = JSON.parse(JSON.stringify(this.formClone))
  }

  async isValidForm (formName:string = 'myForm') {
    const form = Reflect.get(this.$refs, formName)
    return await form.validate()
  }

  resetValidate (formName:string = 'myForm') {
    const form = Reflect.get(this.$refs, formName)
    return form.reset()
  }

  created () {
    if (this.form) {
      this.cloneForm()
    }
  }
}
@Component({

})
class PageMethods extends Vue {
  gotoPage (url, data = {}, isSsr = false) {
    if (isSsr) {
      location.href = url
    } else if (Object.keys(data).length > 0) {
      this.$router.push({ path: url, query: data })
    } else {
      this.$router.push(url)
    }
  }

  async mConfirm (msg) {
    const mdialog = this.$refs.mdialog as any
    return await mdialog.confirm(msg).then(result => result)
  }

  async mAlert (msg) {
    const mdialog = this.$refs.mdialog as any
    await mdialog.alert(msg).then(result => result)
  }

  showSnackbar (msg) {
    this.$store.dispatch('snackbar/setSnack', msg)
  }

  getMessage (key, parms?:any) {
    if (Array.isArray(parms)) {
      return this.$t(key, parms)
    } else {
      return this.$t(key, [parms])
    }
  }

  get APP_NAME ():string {
    return Constants.APP_NAME
  }
}

export { Form, PageMethods }
