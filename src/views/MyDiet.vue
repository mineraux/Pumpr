<template>
  <div class="block">
    <el-form ref="form" :model="form" label-position="top" label-width="100px" @submit.prevent>
      <el-form-item label="Nom du produit">
        <el-input v-model="form.productName"></el-input>
      </el-form-item>
      <el-form-item label="Macronutriments">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Protéines">
              <el-input-number v-model="form.proteins" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Glucides">
              <el-input-number v-model="form.carbs" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Lipides">
              <el-input-number v-model="form.lipids" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Calories">
              <el-input-number v-model="form.cals" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :plain="true" @click="onSubmitIngredient">Sauvegarder mon ingrédient</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
  .el-form {
    max-width: 400px;
  }
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class MyDiet extends Vue {
  private form = {
    productName: '',
    proteins: 0,
    carbs: 0,
    lipids: 0,
    cals: 0,
  }

  onSubmitIngredient(): void {
    // TODO: Target specific value to avoid incorrect add in base via window trick from client side
    this.$store.dispatch('saveProduct', this.form)

    // TODO: Handle this in the promise in the store and handle error case
    this.$message({
      showClose: true,
      message: 'Product successfully created',
      type: 'success'
    });
  }
}
</script>
