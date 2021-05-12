<template>
  <div>
    <ValidationObserver ref="myForm" v-slot="{ }">
      <v-row justify="center" class="mt-8 mb-8" no-gutters>
        <v-col cols="12" xl="8">
          <v-row align="center">
            <v-col cols="7">
              <p class="title">
                Create your {{ APP_NAME }} Account
              </p>
            </v-col>
            <v-col class="text-right">
              Bạn đã là thành viên? Đăng nhập tại <nuxt-link to="/user/login">
                đây
              </nuxt-link>
            </v-col>
          </v-row>
          <v-card outlined>
            <v-card-text class="pb-10 pt-10 pl-7 pr-7">
              <v-row>
                <v-col cols="12" sm="6">
                  <ValidationObserver ref="codeForm" v-slot="{ }">
                    <v-fade-transition leave-absolute>
                      <div v-if="isPhone" key="1">
                        <m-text-field-label
                          v-model="form.phone"
                          rules="required"
                          label="Số điện thoại"
                          place-holder="Nhập số điện thoại của bạn"
                          :count="200"
                        />
                      </div>
                      <div v-else key="2">
                        <m-text-field-label
                          v-model="form.email"
                          rules="required|email"
                          label="Địa chỉ email"
                          place-holder="Nhập email của bạn"
                          :count="200"
                        />
                      </div>
                    </v-fade-transition>
                  </ValidationObserver>
                  <v-fade-transition leave-absolute>
                    <m-drag-verify
                      v-if="!isPassed"
                      ref="dragVerify"
                      key="3"
                      :width="400"
                      :height="44"
                      text="Trượt sang phải để nhận mã"
                      success-text="Đang gửi mã..."
                      background="#1b9984"
                      progress-bar-bg="#F7941D"
                      completed-bg="#66cc66"
                      handler-bg="#fff"
                      handler-icon="mdi mdi-chevron-triple-right"
                      text-size="16px"
                      success-icon="mdi mdi-check"
                      :circle="true"
                      class="mb-3"
                      @passcallback="onVerify"
                    />
                    <m-text-field-label
                      v-else
                      key="4"
                      v-model="form.code"
                      rules="required"
                      :label="'Mã xác nhận '+(isPhone?'điện thoại':'email')"
                      place-holder="6 chữ số"
                      :max-length="6"
                    >
                      <template v-if="isPassed" #append>
                        <div v-show="isCounting" id="time" class="mt-1" color="grey--text" />
                        <div v-show="isResend" class="resend" @click="onResend">
                          Gửi lại
                        </div>
                      </template>
                    </m-text-field-label>
                  </v-fade-transition>
                  <m-text-field-label
                    v-model="form.password"
                    rules="required"
                    type="password"
                    label="Mật khẩu"
                    place-holder="Tối thiểu 6 kí tự bao gồm cả chữ và số"
                    :count="100"
                  />
                  <m-text-field-label
                    v-model="form.confirm"
                    rules="required"
                    type="password"
                    label="Xác nhận"
                    place-holder="Nhập xác nhận mật khẩu"
                    :count="100"
                  />

                  <v-row>
                    <v-col>
                      <div style="margin-bottom:2px">
                        Ngày sinh
                      </div>
                      <v-menu
                        v-model="dateDialog"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="form.date"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            outlined
                            dense
                            placeholder="dd/mm/yyyy"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="form.date"
                          @input="dateDialog = false"
                        />
                      </v-menu>
                    </v-col>
                    <v-col cols="4">
                      <m-select :data-source="gender" label="Giới tính" />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="pl-7">
                  <m-text-field-label
                    v-model="form.email"
                    rules="required"
                    label="Full name"
                    place-holder="First Last"
                    :count="100"
                  />
                  <v-checkbox class="ma-0" label="Tôi muốn cập nhật thông tin ưu đãi qua email" />
                  <m-button
                    icon="mdi-account"
                    block
                    color="secondary"
                    hover-color="primary"
                    text="Đăng ký"
                    :height="46"
                    @onClick="onRegister"
                  />

                  <div class="mt-2 mb-4">
                    Bằng cách ấn vào nút "ĐĂNG KÝ", tôi đồng ý với <nuxt-link to="/">
                      Điều Khoản Sử Dụng
                    </nuxt-link> và <nuxt-link to="/">
                      Chính Sách Bảo Mật của
                    </nuxt-link> {{ APP_NAME }}
                  </div>
                  <div class="mt-1 mb-2">
                    hoặc đăng ký với
                  </div>
                  <m-button
                    icon="mdi-account"
                    block
                    outline
                    color="secondary"
                    :text="!isPhone?'Đăng ký với Mobile': 'Đăng ký với Email'"
                    :height="46"
                    class="mb-2"
                    @onClick="isPhone = !isPhone"
                  />

                  <v-row no-gutters>
                    <v-col cols="6" class="pr-1">
                      <m-button
                        block
                        icon="mdi-google-plus"
                        color="#D34836"
                        text-color="white"
                        :elevation="0"
                        hover-color="#D34836"
                        text="Google"
                        @onClick="onGoogleLogin"
                      />
                    </v-col>
                    <v-col cols="6" class="pl-1">
                      <m-button
                        :elevation="0"
                        block
                        icon="mdi-facebook"
                        color="#3B5998"
                        text-color="white"
                        hover-color="#3B5998"
                        text="Facebook"
                        @onClick="onFacebookLogin"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <m-dialog ref="mdialog" />
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import MButton from '@/components/controls/MButton'
// @ts-ignore
import MTextFieldLabel from '@/components/controls/MTextFieldLabel'
// @ts-ignore
import MFormDialog from '@/components/MFormDialog'
import BaseP from '@/mixins/BaseP'
import { Form, PageMethods } from '@/mixins/Common'
import ListMixin from '@/mixins/ListMixin'
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { Inject } from 'inversify-props'
import type { IAuthService } from '~/api/services'
import MDragVerify from '~/components/controls/MDragVerify.vue'
import MSelect from '~/components/controls/MSelect.vue'
import { UserStore } from '~/utils/access-store'

@Component({
  components: {
    ValidationObserver,
    MButton,
    MTextFieldLabel,
    MFormDialog,
    MDragVerify,
    MSelect
  }
})
export default class Login extends mixins(BaseP, ListMixin, Form, PageMethods) {
  pageTitle:string='Đăng ký';
  isFail:boolean=false;
  isPhone:boolean=false;
  isPassed:boolean=false;
  dateDialog:boolean=false;
  isCounting:boolean=false;
  isResend:boolean=false;
  gender:Array<object>=[
    { id: '', name: '' },
    { id: 1, name: 'Nam' }, { id: 2, name: 'Nữ' }
  ]

  @Inject()
  private authService!: IAuthService

  form = {
    phone: '',
    date: '',
    email: '',
    fullName: '',
    password: '',
    confirm: '',
    code: ''
  }

    @UserStore.Action('setUser') saveUserStore

    async onRegister () {
      const rs = await this.authService.createUserWithEmailAndPassword(this.form.email, this.form.password)
      this.saveUserStore(rs)
      this.gotoPage('/user/profile')
    }

    async onFacebookLogin () {
      const rs = await this.authService.loginFacebook()
      this.saveUserStore(rs)
      this.gotoPage('/user/profile')
    }

    async onGoogleLogin () {
      const rs = await this.authService.loginGoogle()
      this.saveUserStore(rs)
      this.gotoPage('/user/profile')
    }

    async onVerify () {
      const form:any = this.$refs.codeForm
      const valid = await form.validate()

      if (valid) {
        setTimeout(() => {
          this.isPassed = true
          this.showSnackbar(`Vui lòng kiểm tra ${this.isPhone ? 'điện thoai' : 'email'} của bạn để lấy mã xác nhận`)
          this.showCount(59)
        }, 1000)
      } else {
        this.$refs.dragVerify.init()
      }
    }

    showCount (duration) {
      const _this = this
      let timer = duration; let seconds
      const interval = setInterval(function () {
        seconds = parseInt(timer % 60, 10)

        seconds = seconds.toString().padStart(2, '0')

        document.getElementById('time').textContent = `Gửi lại (${seconds})`
        _this.isCounting = true

        if (--timer < 0) {
          clearInterval(interval)
          _this.isCounting = false
          _this.isResend = true
        }
      }, 2000)
    }

    onResend () {
      this.isPassed = false
      this.isCounting = false
      this.isResend = false
    }

    created () {

    }
}
</script>

<style scoped>
.resend, resend:hover{
  color: #1C81FF;
  cursor: pointer;
  margin-top:2px
}
.resend{
  text-decoration: underline;
}
.resend:hover{
  text-decoration: none;
}
</style>
