<template>
  <v-dialog v-model="shown" :max-width="450" persistent>
    <v-card>
      <v-responsive>
        <v-card-title v-if="title">
          <h3>
            <v-icon v-if="type === 'alert'" color="secondary">
              mdi-alert
            </v-icon>
            <v-icon v-else color="secondary">
              mdi-comment-question-outline
            </v-icon>
            {{ title }}
          </h3>
        </v-card-title>
        <v-divider style="margin-top:-10px" />
        <v-card-text>
          <div class="multiline">
            {{ message }}
          </div>
        </v-card-text>

        <v-card-actions>
          <div align="right" style="width:100%">
            <v-btn class="mr-2" width="100" color="primary" @click="onOK">
              OK
            </v-btn>
            <v-btn v-if="type !== 'alert'" color="secondary" width="100" @click="onCancel">
              Hủy
            </v-btn>
          </div>
        </v-card-actions>
      </v-responsive>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Constants from '@/utils/Constants'
@Component({})
export default class MFormDialog extends Vue {
  shown:boolean= false;
  title:string= '';
  type:string= 'alert';
  resolve:any =null;
  reject: any = null;
  message:string = ''

  alert (message) {
    this.title = this.$t('dialog.inform', [Constants.APP_NAME]).toString()
    this.type = 'alert'
    this.shown = true
    this.message = message
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  confirm (message) {
    this.title = this.$t('dialog.confirm', [Constants.APP_NAME]).toString()
    this.type = 'confirm'
    this.message = message
    this.shown = true
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  onCancel () {
    this.shown = false
    this.resolve(false)
  }

  onOK () {
    this.shown = false
    this.resolve(true)
  }
}
/* export default {
  props: {},
  data() {
    return {
      shown: false,
      title: "",
      type: "alert",
      resolve: null,
      reject: null,
      message: ""
    };
  },
  methods: {
    alert(message) {
      this.title = "LNLG thông báo";
      this.type = "alert";
      this.shown = true;
      this.message = message;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirm(message) {
      this.title = "LNLG xác nhận";
      this.type = "confirm";
      this.message = message;
      this.shown = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    onCancel() {
      this.shown = false;
      this.resolve(false);
    },
    onOK() {
      this.shown = false;
      this.resolve(true);
    }
  }
}; */
</script>
