<template>
  <div class="notification is-danger">
    <v-hover v-slot="{ hover }" open-delay="100">
      <v-btn
        :color="hover ? hoverColor : color"
        :small="small"
        :elevation="elevation"
        :height="height"
        :outlined="outline"
        class="ma-0"
        :width="width"
        :disabled="disabled || processing"
        :block="block"
        @click="onClick"
      >
        <v-icon v-if="icon" :color="textColor" size="16" class="mr-1">
          {{ icon }}
        </v-icon>
        <span class="text-capitalize" :style="{color:textColor}">{{ text }}</span>
        <div v-if="processing" class="spin" align="center">
          <v-progress-circular indeterminate size="26" color="primary" />
        </div>
      </v-btn>
    </v-hover>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
@Component({})
export default class MButton extends Vue {
  @Prop({ default: 'Button' }) text!: string
  @Prop({ default: 'primary' }) color!: string
  @Prop({ default: 'secondary' }) hoverColor!: string
  @Prop({ default: '' }) textColor!: string
  @Prop({ default: '' }) icon!: string
  @Prop({ default: '' }) width!: string
  @Prop({ required: false, default: false }) disabled!: boolean
  @Prop({ required: false, default: false }) block!: boolean
  @Prop({ required: false, default: false }) processing!: boolean
  @Prop({ required: false, default: false }) small!: boolean
  @Prop({ required: false, default: false }) outline!: boolean
  @Prop({ required: false }) elevation!: number
  @Prop({ required: false, default: null }) height!: number

  onClick () {
    this.$emit('onClick')
  }
}

</script>
<style scoped>
.spin {
  text-align: center;
  position: absolute;
  width: 100%;
}
</style>
