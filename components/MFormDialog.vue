<template>
  <v-dialog v-model="isShow" :max-width="maxWidth+'px'" persistent scrollable>
    <v-card>
      <v-card-title class="pt-2 pb-2">
        <v-row no-gutters justify="space-between">
          <v-col>
            <slot name="header" />
          </v-col>
          <v-col cols="1" align="right">
            <v-btn icon style="margin:-18px -24px 0 0" @click="onClose">
              <v-icon size="28">
                mdi-close-circle-outline
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text class="pt-3 scroll">
        <slot name="body" />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <slot name="footer" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
@Component({})
export default class MFormDialog extends Vue {
  @Prop({ required: false, default: false }) isShow!: boolean
  @Prop({ required: false, default: false }) isCloseEmit!: boolean
  @Prop({ required: false, default: 500 }) maxWidth!: number
  @Prop({ required: false, default: true }) isUsedAction!: boolean

  onClose () {
    this.$emit('close')
  }
}

</script>
