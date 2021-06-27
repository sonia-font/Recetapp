[MASTER: CONTIENE LA ENTREGA PARA TALLER DE PROGRAMACION 2 PRESENTADA EL DIA DE LA ENTREGA
DEVELOP: CONTIENE LA REFORMULACION DE BACK PARA CUBRIR LAS NECESIDADES DE FRONT PARA LA ENTREGA DE NUEVAS TECNOLOGIAS 2]

**RECETAPP**


Recetapp es una aplicación que permite solucionar el problema del manejo de ingredientes y planeamiento de recetas de las personas.
--


**ALCANCE**


REQUISITOS FUNCIONALES:

- **Cargar mi Heladera**: Elegir de una lista de elementos los ingredientes que voy a contar para buscar recetas en un futuro, con unidades.

- **¿Qué como ahora?**: La app me arroja recetas posibles en función a los ingredientes que tengo en “mi heladera”. Puedo ordenar por receta con más likes, menos tiempo, y dificultad. Puedo filtrar por vegetariano. Me recalcula los ingredientes necesarios dependiendo de cuantos comenzales tengo.

- **Planificador semanal de recetas**: Puedes elegir recetas que se quieras hacer en la semana, y que te arme la lista de compra en función de eso, quitando los ingredientes que ya tienes en la heladera.

- El usuario puede **agregar recetas con ingredientes** unicamente que nosotros permitimos (para conservar una consistencia).

- **Playlist** que te recomiende segun el pais de la receta.


REQUISITOS NO FUNCIONALES:

- **Base de datos** en MongoDB que va a contar con tablas de Usuarios, Recetas, Elementos Heladera, entre otros.

- **Login de Google**, con un token almacenado en la BD

- El frontend va a estar realizado en **React Native**

- El backend va a estar realizado en **NodeJS** utilizando Express


FUERA DE ALCANCE:

- No permite interaccion directa entre los usuarios registrados

- No va a mostrar por defecto recetas por elecciones realizadas previamente. Solo lo va a hacer para armar las recetas de la semana.

- No se va a poder comprar ingredientes dentro de la aplicacion

- Solo tiene login por Google, no tiene acceso por ninguna otra red social
