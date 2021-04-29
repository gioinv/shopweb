/* eslint-disable vue/require-prop-types */
<template>
  <ValidationProvider v-slot="{ errors }" :vid="vid" :rules="rules">
    <v-text-field
      outlined
      :disabled="disabled"
      :append-icon="appendIcon"
      :label="label"
      :counter="counter"
      :placeholder="placeHolder"
      :value="value"
      :error="error"
      :error-messages="errors"
      :counter-value="(v) => (v ? v.trim().length : 0)"
      :maxlength="maxLength || counter"
      dense
      :hide-details="hideDetails"
      @input="$emit('input', $event)"
      @keyup="$emit('keyup', $event)"
      @blur="$emit('blur', $event)"
    >
      <template #label>
        {{ label }}
        <span v-if="isRequired && !disabled" class="error--text">*</span>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'
@Component({
  components: {
    ValidationProvider
  }
})
export default class MButton extends Vue {
  @Prop({ default: '' }) value!: any
  @Prop({ default: '' }) placeHolder!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) rules!: string
  @Prop({ default: '' }) appendIcon!: string
  @Prop({ default: '' }) vid!: string
  @Prop({ default: null }) counter!: number
  @Prop({ default: null }) maxLength!: any
  @Prop({ required: false, default: false }) disabled!: boolean
  @Prop({ required: false, default: false }) error!: boolean
  @Prop({ required: false, default: false }) processing!: boolean
  @Prop({ required: false, default: false }) small!: boolean
  @Prop({ required: false, default: false }) hideDetails!: boolean

  getCount () {
    if (this.value === null) { return 0 } else { return this.value.length }
  }

  get isRequired ():boolean {
    return this.rules ? this.rules.includes('required') : false
  }
}

</script>
