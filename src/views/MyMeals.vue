<template>
  <el-container>
    <el-main>
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

        <el-row :gutter="30">
          <el-col :span="8">
            <h4>Catégories</h4>
          </el-col>
          <el-col :span="8">
            <h4>Poids (en gramme)</h4>
          </el-col>
        </el-row>

        <el-row
          :gutter="30"
          v-for="(product, index) in form.mealProducts"
          :key="index"
          class="product-row"
        >
          <el-col :span="8">
            <el-form-item>
              <el-cascader
                :options="productOptions"
                :show-all-levels="false"
                placeholder="Selectionnes un produit"
                @change="e => onCascaderChange(index, e)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input-number
                v-model="product.weight"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button
                type="danger"
                :plain="true"
                @click="_ => onClickDeleteProduct(index)"
              >
                Supprimer ce produit
              </el-button>
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
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-form {
  max-width: 840px;

  .product-row {
    .el-form-item {
      &__content {
        .el-cascader,
        .el-input-number,
        .el-button {
          width: 100%;
        }
      }
    }
  }
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

  onCascaderChange(index: number, product: CategoryChoice): void {
    this.form.mealProducts[index].id = product[1]
  }

  onClickAddProduct(): void {
    this.form.mealProducts.push({
      id: '',
      weight: 0
    })
  }

  onClickDeleteProduct(productIndex: number): void {
    this.form.mealProducts.splice(productIndex, 1)
  }

  async onSubmitMeal() {
    try {
      await this.$store.dispatch('saveMeal', this.form)

      this.$message({
        showClose: true,
        message: 'Repas créé avec succès',
        type: 'success'
      })
    } catch {
      this.$message({
        showClose: true,
        message: 'Une erreur est parvenue durant la création du repas',
        type: 'error'
      })
    }
  }
}
</script>
