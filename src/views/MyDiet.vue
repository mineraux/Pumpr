<template>
  <div class="block">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      label-width="100px"
      @submit.prevent
    >
      <el-form-item label="Nom" prop="name">
        <el-input v-model="form.name" placeholder="Riz complet"></el-input>
      </el-form-item>
      <el-form-item label="Catégorie">
        <el-select v-model="form.category" :placeholder="categories[0].label">
          <el-option
            v-for="category in categories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Macronutriments">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Protéines">
              <el-input-number
                v-model="form.proteins"
                controls-position="right"
                :min="0"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Glucides">
              <el-input-number
                v-model="form.carbs"
                controls-position="right"
                :min="0"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Lipides">
              <el-input-number
                v-model="form.lipids"
                controls-position="right"
                :min="0"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Calories">
              <el-input-number
                v-model="form.cals"
                controls-position="right"
                :min="0"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="success" :plain="true" @click="onSubmitIngredient">
          Sauvegarder mon ingrédient
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="$store.state.products"
      stripe
      style="width: 100%"
      empty-text="Aucun produit disponible"
    >
      <el-table-column prop="id" label="ID produit"></el-table-column>
      <el-table-column prop="category" label="Catégorie"></el-table-column>
      <el-table-column prop="name" label="Nom du produit" width="180">
      </el-table-column>
      <el-table-column prop="proteins" label="Protéines"></el-table-column>
      <el-table-column prop="carbs" label="Glucides"></el-table-column>
      <el-table-column prop="lipids" label="Lipides"></el-table-column>
      <el-table-column prop="cals" label="Calories"></el-table-column>
      <!-- TODO: Add delete button -> error if used in a meal -->
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.el-form {
  max-width: 400px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProductCategory } from '@/types/Product'

@Component
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
    category: ProductCategory.proteins,
    name: '',
    proteins: 0,
    carbs: 0,
    lipids: 0,
    cals: 0
  }

  private rules = {
    name: [
      { required: true, message: 'Le nom est nécessaire', trigger: 'blur' }
    ]
  }

  created() {
    this.$store.dispatch('bindProductsRef')
  }

  resetForm() {
    this.form = {
      category: ProductCategory.proteins,
      name: '',
      proteins: 0,
      carbs: 0,
      lipids: 0,
      cals: 0
    }
  }

  async onSubmitIngredient() {
    // TODO: Add required values

    try {
      await this.$store.dispatch('saveProduct', {
        category: this.form.category,
        name: this.form.name,
        proteins: this.form.proteins,
        carbs: this.form.carbs,
        lipids: this.form.lipids,
        cals: this.form.cals
      })

      this.resetForm()

      this.$message({
        showClose: true,
        message: 'Produit créé avec succès',
        type: 'success'
      })
    } catch {
      this.$message({
        showClose: true,
        message: 'Une erreur est parvenue durant la création du produit',
        type: 'error'
      })
    }
  }
}
</script>
