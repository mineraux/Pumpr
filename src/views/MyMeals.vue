<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-position="top"
    label-width="100px"
    @submit.prevent
  >
    <el-form-item label="Nom du repas" prop="mealName">
      <el-input v-model="form.mealName"></el-input>
    </el-form-item>
    <h3>Produits</h3>
    <!-- Add delete button -->
    <el-row :gutter="20">
      <el-col :span="12">
        <h4>Catégories</h4>
      </el-col>
      <el-col :span="12">
        <h4>Poids (en gramme)</h4>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      v-for="(product, index) in form.mealProducts"
      :key="index"
    >
      <el-col :span="12">
        <el-form-item>
          <el-cascader
            :options="productOptions"
            :show-all-levels="false"
            placeholder="Selectionnes un produit"
            @change="e => onChange(index, e)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <el-input-number
            v-model="product.weight"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="onClickAddProduct">Ajouter un produit</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="success" :plain="true" @click="onSubmitMeal">
        Sauvegarder mon repas
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  max-width: 400px;
}

h3,
h4 {
  font-weight: normal;
}

h3 {
  margin-bottom: 0;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProductCategory, CategoryChoice } from '@/types/Product'
import { CascaderOption } from 'element-ui/types/cascader'
import { getCascaderOptions } from '@/helper/Meal'

@Component
export default class MyMeals extends Vue {
  created() {
    this.$store.dispatch('bindProductsRef')
  }

  //TODO: Handle empty products

  get productOptions(): CascaderOption[] {
    return [
      {
        value: 'sourceProt',
        label: 'Source de protéines',
        children: getCascaderOptions(
          this.$store.state.products,
          ProductCategory.proteins
        )
      },
      {
        value: 'sourceCarbs',
        label: 'Source de glucides',
        children: getCascaderOptions(
          this.$store.state.products,
          ProductCategory.carbs
        )
      },
      {
        value: 'sourceLipids',
        label: 'Source de lipides',
        children: getCascaderOptions(
          this.$store.state.products,
          ProductCategory.lipids
        )
      }
    ]
  }

  private form = {
    mealName: '',
    mealProducts: [
      {
        id: '',
        weight: 0
      }
    ]
  }

  private rules = {
    mealName: [
      { required: true, message: 'Le nom est nécessaire', trigger: 'blur' }
    ]
  }

  onChange(index: number, product: CategoryChoice): void {
    this.form.mealProducts[index].id = product[1]
  }

  onClickAddProduct(): void {
    this.form.mealProducts.push({
      id: '',
      weight: 0
    })
  }

  onSubmitMeal(): void {
    this.$store.dispatch('saveMeal', this.form)

    // TODO: Handle this in the promise in the store and handle error case

    this.$message({
      showClose: true,
      message: 'Meal successfully created',
      type: 'success'
    })
  }
}
</script>
