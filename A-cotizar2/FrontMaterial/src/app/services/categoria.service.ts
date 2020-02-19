import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  

  categorias = [
    {
      id:1,
      categoria:'CONSTRUCCION',
      subcategorias:[
        'Ferreteria',
        'Luces e Iluminacion',
        'Hogar, Decoracion y muebles',
        'Accesorios Vehiculo'
      ]
    },
    {
      id:2,
      categoria:'ABARROTES',
      subcategorias:[
        'Viveres',
        'Provisiones',
        'Abastos',
        'Ultramarinos'
      ]
    },
    {
      id:3,
      categoria:'TECNOLOGIA',
      subcategorias:[
        'Aparatos Eletronicos',
        'Electrodomésticos',
        'Computo',
        'Equipo eléctrico',
        'Repuestos',
        'Suministros'
      ]
    }
  ]

  pedido = {
    productos:[],
    descripcion:'',
    ciudad:''
  }


  private miPedido = new BehaviorSubject({})
  pedidoActual = this.miPedido.asObservable();
  subcategorias: any;
  constructor() { }

  modificarPedido(nuevoPedido:Object){
    this.miPedido.next(nuevoPedido);
  }
}
