/* eslint-disable vue/require-prop-types */
<template>
  <ValidationProvider v-slot="{ errors }" :vid="vid" :rules="rules">
    <div style="margin-bottom:2px">
      {{ label }} <span v-if="isRequired && !disabled" class="error--text">*</span>
    </div>
    <v-text-field
      outlined

      :disabled="disabled"
      :append-icon="appendIcon"
      :counter="counter"
      :placeholder="placeHolder"
      :autocomplete="autocomplete"
      :value="value"
      :error="error"
      :error-messages="errors"
      :counter-value="(v) => (v ? v.trim().length : 0)"
      :maxlength="maxLength || counter"
      :type="type"
      dense

      :hide-details="hideDetails"
      @input="$emit('input', $event)"
      @keyup="$emit('keyup', $event)"
      @blur="$emit('blur', $event)"
    >
      <template slot="append">
        <slot name="append" />
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
export default class MTextFieldLabel extends Vue {
  @Prop({ default: '' }) value!: any
  @Prop({ default: '' }) placeHolder!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) rules!: string
  @Prop({ default: '' }) appendIcon!: string
  @Prop({ default: '' }) vid!: string
  @Prop({ default: '' }) type!: string
  @Prop({ default: '' }) autocomplete!: string
  @Prop({ default: '' }) appendSlot!: string
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
