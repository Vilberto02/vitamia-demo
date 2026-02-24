# 📋 Endpoint: Obtener Todos los Alimentos

## Descripción
Este endpoint devuelve todos los alimentos disponibles en la base de datos, **agrupados por categoría** (carnes, verduras, frutas, lácteos, etc.). 

**Importante:** Los alimentos NO están vinculados a un momento específico del día (desayuno/almuerzo/cena/snack). Cualquier alimento puede ser seleccionado para cualquier tipo de comida. La separación por momento del día se realiza únicamente cuando el usuario **registra un consumo**.

Este endpoint es útil para:
- Mostrar listas de selección en formularios
- Permitir al usuario elegir cualquier alimento para cualquier comida
- Reutilizar el mismo alimento en diferentes momentos del día

---

## 🔗 URL
```
GET /api/alimentos
```

---

## 🔐 Autenticación
**Requerida:** Sí

Este endpoint requiere un token JWT válido en el header `Authorization`.

```
Authorization: Bearer {token}
```

---

## 📊 Respuesta Exitosa

**Código:** `200 OK`

**Estructura:** Objeto con propiedades por cada categoría de alimento, cada una conteniendo un array de alimentos.

```json
{
  "carnes": [
    {
      "id": 1,
      "nombre": "Pollo",
      "unidad": "gramos",
      "calorias": 1.65,
      "categoria": "carnes"
    },
    {
      "id": 2,
      "nombre": "Carne de res",
      "unidad": "gramos",
      "calorias": 2.50,
      "categoria": "carnes"
    }
    // ... más carnes
  ],
  "verduras": [
    {
      "id": 15,
      "nombre": "Brócoli",
      "unidad": "gramos",
      "calorias": 0.34,
      "categoria": "verduras"
    }
    // ... más verduras
  ],
  "frutas": [
    // ... frutas
  ],
  "lacteos": [
    // ... lácteos
  ],
  "cereales": [
    // ... cereales
  ],
  "legumbres": [
    // ... legumbres
  ],
  "pescados": [
    // ... pescados
  ],
  "tuberculos": [
    // ... tubérculos
  ],
  "frutos_secos": [
    // ... frutos secos
  ],
  "huevos": [
    // ... huevos
  ],
  "bebidas": [
    // ... bebidas
  ],
  "otros": [
    // ... otros alimentos
  ]
}
```

---

## 📝 Campos de Respuesta

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Integer | ID único del alimento |
| `nombre` | String | Nombre del alimento |
| `unidad` | String | Unidad de medida (gramos, unidades, ml, porciones, etc.) |
| `calorias` | Float | Calorías por unidad de medida |
| `categoria` | String | Categoría del alimento (carnes, verduras, frutas, etc.) |

**Nota:** Los alimentos NO tienen un tipo_comida asignado. El momento del día (desayuno/almuerzo/cena/snack) se define únicamente cuando el usuario registra un consumo.

---

## ⚠️ Respuestas de Error

### Error 401: No autenticado
```json
{
  "error": "Token no proporcionado",
  "mensaje": "Debes estar autenticado para acceder a este recurso"
}
```

### Error 401: Token expirado
```json
{
  "error": "Token expirado",
  "mensaje": "Tu sesión ha expirado, por favor inicia sesión nuevamente"
}
```

### Error 500: Error del servidor
```json
{
  "error": "Error al obtener alimentos",
  "detalle": "Mensaje de error específico"
}
```

---

## 💡 Casos de Uso

### 1. Selector de Alimentos en Frontend

**React Example:**
```jsx
import { useState, useEffect } from 'react';

const SelectorAlimentos = ({ categoria, onSelect }) => {
  const [alimentos, setAlimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarAlimentos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/alimentos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        // Filtrar por categoría si se especifica
        if (categoria) {
          setAlimentos(data[categoria] || []);
        } else {
          // Combinar todos los alimentos
          const todosLosAlimentos = Object.values(data).flat();
          setAlimentos(todosLosAlimentos);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar alimentos:', error);
        setLoading(false);
      }
    };

    cargarAlimentos();
  }, [categoria]);

  if (loading) return <p>Cargando alimentos...</p>;

  return (
    <select onChange={(e) => onSelect(JSON.parse(e.target.value))}>
      <option value="">Selecciona un alimento</option>
      {alimentos.map(alimento => (
        <option 
          key={alimento.id} 
          value={JSON.stringify(alimento)}
        >
          {alimento.nombre} ({alimento.calorias} kcal/{alimento.unidad})
        </option>
      ))}
    </select>
  );
};

export default SelectorAlimentos;

// Uso:
// <SelectorAlimentos categoria="carnes" onSelect={handleSelect} />
// <SelectorAlimentos categoria="frutas" onSelect={handleSelect} />
```

### 2. Búsqueda y Filtrado

**JavaScript Example:**
```javascript
// Obtener todos los alimentos
const obtenerTodosLosAlimentos = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/alimentos', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const alimentosPorCategoria = await response.json();
  
  return alimentosPorCategoria;
};

// Buscar alimentos por nombre
const buscarAlimentos = (alimentosPorCategoria, busqueda) => {
  const resultados = [];
  
  for (const categoria in alimentosPorCategoria) {
    const alimentosFiltrados = alimentosPorCategoria[categoria].filter(alimento =>
      alimento.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    
    if (alimentosFiltrados.length > 0) {
      resultados.push({
        categoria,
        alimentos: alimentosFiltrados
      });
    }
  }
  
  return resultados;
};

// Obtener solo alimentos de una categoría específica
const obtenerPorCategoria = (alimentosPorCategoria, categoria) => {
  return alimentosPorCategoria[categoria] || [];
};

// Uso
const alimentosPorCategoria = await obtenerTodosLosAlimentos();

// Buscar "pollo" en todas las categorías
const resultados = buscarAlimentos(alimentosPorCategoria, 'pollo');
console.log(resultados);
// [
//   {
//     categoria: 'carnes',
//     alimentos: [{ id: 1, nombre: 'Pollo', ... }]
//   }
// ]

// Obtener solo carnes
const carnes = obtenerPorCategoria(alimentosPorCategoria, 'carnes');
console.log(carnes);
// [
//   { id: 1, nombre: 'Pollo', ... },
//   { id: 2, nombre: 'Carne de res', ... },
//   ...
// ]
```

### 3. Formulario de Registro de Consumo

**HTML + JavaScript Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Registrar Consumo</title>
</head>
<body>
  <form id="formConsumo">
    <label>Categoría:</label>
    <select id="categoria" required>
      <option value="">Selecciona una categoría...</option>
      <option value="carnes">🥩 Carnes</option>
      <option value="pescados">🐟 Pescados</option>
      <option value="verduras">🥬 Verduras</option>
      <option value="frutas">🍎 Frutas</option>
      <option value="cereales">🌾 Cereales</option>
      <option value="legumbres">🫘 Legumbres</option>
      <option value="lacteos">🥛 Lácteos</option>
      <option value="tuberculos">🥔 Tubérculos</option>
      <option value="frutos_secos">🥜 Frutos Secos</option>
      <option value="huevos">🥚 Huevos</option>
      <option value="bebidas">🥤 Bebidas</option>
      <option value="otros">📦 Otros</option>
    </select>

    <label>Alimento:</label>
    <select id="alimento" required>
      <option value="">Primero selecciona una categoría</option>
    </select>

    <label>Tipo de Comida:</label>
    <select id="tipoComida" required>
      <option value="">Selecciona...</option>
      <option value="desayuno">Desayuno</option>
      <option value="almuerzo">Almuerzo</option>
      <option value="cena">Cena</option>
      <option value="snack">Snack</option>
    </select>

    <label>Cantidad:</label>
    <input type="number" id="cantidad" step="0.1" min="0" required>
    
    <label>Unidad:</label>
    <input type="text" id="unidad" readonly>

    <p id="infoNutricional"></p>

    <button type="submit">Registrar Consumo</button>
  </form>

  <script>
    const token = localStorage.getItem('token');
    let todosLosAlimentos = {};

    // Cargar alimentos al iniciar
    fetch('http://localhost:3000/api/alimentos', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      todosLosAlimentos = data;
    });

    // Cuando cambia la categoría
    document.getElementById('categoria').addEventListener('change', (e) => {
      const categoria = e.target.value;
      const selectAlimento = document.getElementById('alimento');
      selectAlimento.innerHTML = '<option value="">Selecciona un alimento</option>';
      
      if (categoria && todosLosAlimentos[categoria]) {
        todosLosAlimentos[categoria].forEach(alimento => {
          const option = document.createElement('option');
          option.value = JSON.stringify(alimento);
          option.textContent = `${alimento.nombre} (${alimento.calorias} kcal/${alimento.unidad})`;
          selectAlimento.appendChild(option);
        });
      }
    });

    // Cuando selecciona un alimento
    document.getElementById('alimento').addEventListener('change', (e) => {
      if (e.target.value) {
        const alimento = JSON.parse(e.target.value);
        document.getElementById('unidad').value = alimento.unidad;
        actualizarInfoNutricional();
      }
    });

    // Cuando cambia la cantidad
    document.getElementById('cantidad').addEventListener('input', actualizarInfoNutricional);

    function actualizarInfoNutricional() {
      const selectAlimento = document.getElementById('alimento');
      const cantidad = parseFloat(document.getElementById('cantidad').value);
      
      if (selectAlimento.value && cantidad > 0) {
        const alimento = JSON.parse(selectAlimento.value);
        const caloriasTotales = (cantidad * alimento.calorias).toFixed(2);
        
        document.getElementById('infoNutricional').textContent = 
          `Total: ${caloriasTotales} kcal`;
      }
    }

    // Enviar formulario
    document.getElementById('formConsumo').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const alimento = JSON.parse(document.getElementById('alimento').value);
      const cantidad = parseFloat(document.getElementById('cantidad').value);
      const tipoComida = document.getElementById('tipoComida').value;
      const unidad = document.getElementById('unidad').value;
      
      try {
        const response = await fetch('http://localhost:3000/api/usuarios/consumos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre_alimento: alimento.nombre,
            cantidad: cantidad,
            unidad: unidad,
            tipo_comida: tipoComida
          })
        });
        
        const resultado = await response.json();
        alert(`✓ Consumo registrado: ${resultado.resumen.descripcion}`);
        
        // Limpiar formulario
        e.target.reset();
      } catch (error) {
        alert('Error al registrar consumo');
      }
    });
  </script>
</body>
</html>
```

### 4. Prueba con cURL

```bash
# 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correo":"demo@vitamia.com","contrasena":"demo12345"}'

# Respuesta:
# {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

# 2. Obtener alimentos
curl -X GET http://localhost:3000/api/alimentos \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 5. Prueba con PowerShell

```powershell
# Login
$loginBody = @{
    correo = "demo@vitamia.com"
    contrasena = "demo12345"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $loginBody

$token = $loginResponse.token

# Obtener todos los alimentos
$response = Invoke-RestMethod `
    -Uri "http://localhost:3000/api/alimentos" `
    -Method GET `
    -Headers @{
        Authorization = "Bearer $token"
    }

# Ver alimentos de carnes
$response.carnes | Format-Table nombre, unidad, calorias

# Ver alimentos de frutas
$response.frutas | Format-Table nombre, unidad, calorias

# Contar alimentos por categoría
foreach($categoria in $response.PSObject.Properties.Name) {
    Write-Host "$categoria: $($response.$categoria.Count) alimentos"
}

# Resultado:
# bebidas: 3 alimentos
# carnes: 8 alimentos
# cereales: 16 alimentos
# frutas: 19 alimentos
# frutos_secos: 9 alimentos
# huevos: 3 alimentos
# lacteos: 9 alimentos
# legumbres: 5 alimentos
# otros: 10 alimentos
# pescados: 9 alimentos
# tuberculos: 3 alimentos
# verduras: 17 alimentos
```

---

## 📊 Estadísticas de la Base de Datos

**Total de alimentos disponibles:** 111

| Categoría | Cantidad de Alimentos |
|-----------|----------------------|
| 🥩 Carnes | 8 alimentos |
| 🐟 Pescados | 9 alimentos |
| 🥬 Verduras | 17 alimentos |
| 🍎 Frutas | 19 alimentos |
| 🌾 Cereales | 16 alimentos |
| 🫘 Legumbres | 5 alimentos |
| 🥛 Lácteos | 9 alimentos |
| 🥔 Tubérculos | 3 alimentos |
| 🥜 Frutos Secos | 9 alimentos |
| 🥚 Huevos | 3 alimentos |
| 🥤 Bebidas | 3 alimentos |
| 📦 Otros | 10 alimentos |

### Ejemplos de Alimentos por Categoría:

**🥩 Carnes:**
- Pollo (1.65 kcal/gramos)
- Carne de res (2.50 kcal/gramos)
- Pechuga de pavo (1.11 kcal/gramos)
- Jamón de pavo (1.05 kcal/gramos)
- Cerdo (2.42 kcal/gramos)
- Cordero (2.94 kcal/gramos)

**🐟 Pescados:**
- Pescado (2.06 kcal/gramos)
- Atún (1.32 kcal/gramos)
- Salmón (2.08 kcal/gramos)
- Trucha (1.48 kcal/gramos)
- Tilapia (0.96 kcal/gramos)
- Camarones (0.99 kcal/gramos)

**🥬 Verduras:**
- Brócoli (0.34 kcal/gramos)
- Zanahoria (0.41 kcal/gramos)
- Espinaca (0.23 kcal/gramos)
- Tomate (0.18 kcal/gramos)
- Lechuga (0.15 kcal/gramos)
- Champiñones (0.22 kcal/gramos)
- Calabacín (0.17 kcal/gramos)

**🍎 Frutas:**
- Manzana (52 kcal/unidades)
- Plátano (89 kcal/unidades)
- Naranja (47 kcal/unidades)
- Uvas (0.69 kcal/gramos)
- Fresas (0.32 kcal/gramos)
- Aguacate (1.60 kcal/gramos)

**🌾 Cereales:**
- Arroz blanco (1.30 kcal/gramos)
- Arroz integral (1.11 kcal/gramos)
- Avena (3.89 kcal/gramos)
- Quinoa (1.20 kcal/gramos)
- Pasta (1.31 kcal/gramos)
- Pan integral (65 kcal/rebanadas)

**🥛 Lácteos:**
- Leche (0.42 kcal/ml)
- Yogurt natural (0.59 kcal/gramos)
- Yogurt griego (0.97 kcal/gramos)
- Queso fresco (2.64 kcal/gramos)
- Queso cheddar (4.03 kcal/gramos)

**🥜 Frutos Secos:**
- Almendras (5.79 kcal/gramos)
- Nueces (6.54 kcal/gramos)
- Maní (5.67 kcal/gramos)
- Mantequilla de maní (5.88 kcal/gramos)
- Pistachos (5.62 kcal/gramos)

**🫘 Legumbres:**
- Lentejas (1.16 kcal/gramos)
- Frijoles (1.27 kcal/gramos)
- Garbanzos (1.64 kcal/gramos)
- Hummus (1.66 kcal/gramos)
- Soja (1.47 kcal/gramos)

---

## 🔍 Otros Endpoints Relacionados

### Filtrar por Tipo de Comida
```
GET /api/alimentos/tipo/:tipo
```
Ejemplo: `GET /api/alimentos/tipo/desayuno`

### Buscar por Nombre
```
GET /api/alimentos/nombre/:nombre
```
Ejemplo: `GET /api/alimentos/nombre/Pollo`

---

## 💻 Integración con Frontend

### Custom Hook React

```typescript
// useAlimentos.ts
import { useState, useEffect } from 'react';

interface Alimento {
  id: number;
  nombre: string;
  unidad: string;
  calorias: number;
  categoria: string;
  id_tipo_comida: number;
  tipo_comida: {
    id: number;
    nombre: string;
  };
}

interface AlimentosPorCategoria {
  [categoria: string]: Alimento[];
}

export const useAlimentos = () => {
  const [alimentos, setAlimentos] = useState<AlimentosPorCategoria>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarAlimentos = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No hay token de autenticación');
        }

        const response = await fetch('http://localhost:3000/api/alimentos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar alimentos');
        }

        const data = await response.json();
        setAlimentos(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };

    cargarAlimentos();
  }, []);

  const obtenerPorCategoria = (categoria: string): Alimento[] => {
    return alimentos[categoria] || [];
  };

  const buscar = (termino: string): Alimento[] => {
    const resultados: Alimento[] = [];
    
    Object.values(alimentos).forEach(lista => {
      lista.forEach(alimento => {
        if (alimento.nombre.toLowerCase().includes(termino.toLowerCase())) {
          resultados.push(alimento);
        }
      });
    });

    return resultados;
  };

  const obtenerCategorias = (): string[] => {
    return Object.keys(alimentos);
  };

  return {
    alimentos,
    loading,
    error,
    obtenerPorCategoria,
    obtenerCategorias,
    buscar
  };
};

// Uso en un componente:
// const { alimentos, loading, obtenerPorCategoria } = useAlimentos();
// const carnes = obtenerPorCategoria('carnes');
// const frutas = obtenerPorCategoria('frutas');
```

---

## 📝 Notas Importantes

1. **Autenticación Requerida:** Todos los endpoints de alimentos requieren un token JWT válido.

2. **Agrupación por Categoría:** Los alimentos vienen agrupados por categoría (carnes, verduras, frutas, etc.) para facilitar la organización en la UI.

3. **Flexibilidad de Uso:** Cualquier alimento puede ser seleccionado para cualquier tipo de comida (desayuno/almuerzo/cena/snack). Por ejemplo, "Huevo" puede consumirse en el desayuno, almuerzo o cena según la preferencia del usuario.

4. **Tipo de Comida:** El momento del día (desayuno/almuerzo/cena/snack) se define ÚNICAMENTE al registrar un consumo mediante `POST /api/usuarios/consumos`, NO en la tabla de alimentos.

5. **Unidades Variadas:** Los alimentos tienen diferentes unidades de medida (gramos, ml, unidades, porciones, rebanadas, etc.). Asegúrate de mostrar la unidad correcta en tu interfaz.

6. **Calorías por Unidad:** El campo `calorias` representa las calorías por unidad de medida especificada. Para calcular calorías totales: `cantidad × calorias`.

7. **Búsqueda:** Para búsquedas más específicas, usa los endpoints `/api/alimentos/nombre/:nombre` o `/api/alimentos/tipo/:tipo`.

8. **Categorías Disponibles:** carnes, pescados, verduras, frutas, cereales, legumbres, lacteos, tuberculos, frutos_secos, huevos, bebidas, otros.

---

## 🚀 Próximas Mejoras

- [ ] Paginación para listas grandes
- [ ] Ordenamiento personalizado (alfabético, por calorías, etc.)
- [ ] Búsqueda con autocompletado
- [ ] Filtros avanzados (rango de calorías, tipo de unidad, etc.)
- [ ] Información nutricional completa (proteínas, carbohidratos, grasas)
- [ ] Imágenes de alimentos
- [ ] Alimentos favoritos por usuario
- [ ] Alimentos más consumidos
