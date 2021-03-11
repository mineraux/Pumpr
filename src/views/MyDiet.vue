<template>
  <div class="block">
    <el-form ref="form" :model="form" label-position="top" label-width="100px" @submit.prevent>
      <el-form-item label="Nom">
        <el-input v-model="form.productName" placeholder="Riz complet"></el-input>
      </el-form-item>
      <el-form-item label="Catégorie">
        <el-select v-model="form.category" :placeholder="categories[0].label">
          <el-option
            v-for="category in categories"
            :key="category.value"
            :label="category.label"
            :value="category.value">
          </el-option>
        </el-select>
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
        <el-button type="success" :plain="true" @click="onSubmitIngredient">Sauvegarder mon ingrédient</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="$store.state.products" stripe style="width: 100%" empty-text="Aucun produit disponible">
      <el-table-column prop="id" label="ID produit"></el-table-column>
      <el-table-column prop="category" label="Catégorie"></el-table-column>
      <el-table-column prop="productName" label="Nom du produit" width="180"></el-table-column>
      <el-table-column prop="proteins" label="Protéines"></el-table-column>
      <el-table-column prop="carbs" label="Glucides"></el-table-column>
      <el-table-column prop="lipids" label="Lipides"></el-table-column>
      <el-table-column prop="cals" label="Calories"></el-table-column>
      <!-- TODO: Add delete button -->
    </el-table>
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
  private categories = [
    {
      value: 'proteins',
      label: 'Source de protéines'
    },
    {
      value: 'carbs',
      label: 'Source de glucides'
    },
    {
      value: 'lipids',
      label: 'Source de lipides'
    }
  ]

  private form = {
    category: '',
    productName: '',
    proteins: 0,
    carbs: 0,
    lipids: 0,
    cals: 0,
  }

  created() {
    this.$store.dispatch('bindProductsRef')
  }

  onSubmitIngredient(): void {
    // TODO: Target specific value to avoid incorrect add in base via window trick from client side
    this.$store.dispatch('saveProduct', this.form)

    // TODO: Reset Input on success
    // TODO: Add required values

    // TODO: Handle this in the promise in the store and handle error case
    this.$message({
      showClose: true,
      message: 'Product successfully created',
      type: 'success'
    });
  }
}
</script>
