<template>
  <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="100px" @submit.prevent>
    <el-form-item label="Nom du repas" prop="mealName">
      <el-input v-model="form.mealName"></el-input>
    </el-form-item>
    <el-form-item label="Produits"></el-form-item>
      <!-- Add row id and set to it on change -->
      <el-form-item v-for="(product, index) in form.mealProducts" :key="index" >
        <el-cascader :options="productOptions" :show-all-levels="false" placeholder="Selectionnes un produit" @change="(e) => onChange(index, e)"></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button @click="onClickAddProduct">Ajouter un produit</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="success" :plain="true" @click="onSubmitMeal">Sauvegarder mon repas</el-button>
      </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
  .el-form {
    max-width: 400px;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class MyMeals extends Vue{

  created() {
    this.$store.dispatch('bindProductsRef')
  }

  //TODO: Handle empty products

  private productOptions = [{
    value: 'sourceProt',
    label: 'Source de protéines',
    children: this.$store.state.products
      .filter((product:any) => product.category === 'proteins')
      .map((product: any) => {
        return {
          value: product.id,
          label: product.productName
        }
      })
  },
  {
    value: 'sourceCarbs',
    label: 'Source de glucides',
    children: this.$store.state.products
      .filter((product:any) => product.category === 'carbs')
      .map((product: any) => {
        return {
          value: product.id,
          label: product.productName
        }
      })
  },
  {
    value: 'sourceLipids',
    label: 'Source de lipides',
    children: this.$store.state.products
      .filter((product:any) => product.category === 'lipids')
      .map((product: any) => {
        return {
          value: product.id,
          label: product.productName
        }
      })
  }]

  private form = {
    mealName: '',
    mealProducts: [
      {
        id: ''
      }
    ]
  }

  private rules = {
    mealName: [
      { required: true, message: 'Le nom est nécessaire', trigger: 'blur' },
    ],
  }

  onChange(index:number, product:any): void {
    console.log({index, product})

    this.form.mealProducts[index] = {
      id: product[1]
    }
  }

  onClickAddProduct():void {
    this.form.mealProducts.push({
      id:''
    })
  }

  onSubmitMeal(): void {
    this.$store.dispatch('saveMeal', this.form)

    // TODO: Handle this in the promise in the store and handle error case

    this.$message({
      showClose: true,
      message: 'Meal successfully created',
      type: 'success'
    });
  }
}
</script>