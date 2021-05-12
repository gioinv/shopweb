<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <div style="margin-bottom:2px">
      {{ label }} <span v-if="isRequired && !disabled" class="error--text">*</span>
    </div>
    <v-select
      :value="value"
      :item-text="itemText"
      :item-value="itemValue"
      :items="dataSource"
      :error-messages="errors"
      :disabled="disabled"
      outlined
      dense
      :no-data-text="getMessage('common.no_data')"
      @input="onInput"
    />
  </ValidationProvider>
</template>
<script lang="ts">
import { mixins, Prop, Component } from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { PageMethods } from '@/mixins/Common'

@Component({
  components: {
    ValidationProvider
  }
})
export default class MSelect extends mixins(PageMethods) {
  @Prop({ default: '' }) value!: any
  @Prop({ default: '' }) placeHolder!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) rules!: string
  @Prop({ default: [] }) dataSource!: Array<object>
  @Prop({ default: 'name' }) itemText!: string
  @Prop({ default: 'id' }) itemValue!: string
  @Prop({ default: false }) disabled!: boolean

  get isRequired ():boolean {
    return this.rules ? this.rules.includes('required') : false
  }

  onInput (evt) {
    this.$emit('input', evt)
  }
}

</script>
