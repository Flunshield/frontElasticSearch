# Projet ElasticSearch

## Description

Ce projet est une application web créée avec React, TypeScript et Tailwind CSS dan l'objectif de s'entrainer à utiliser ElastikSearch.

## Liens des partie front-end et back-end(api) de l'appication
[Projet react](https://github.com/Flunshield/frontElasticSearch)  
[Api nestJs](https://github.com/kbegot/back-app-elasticsearch)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Node.js
- npm ou yarn

## Installation

1. Lancer cette commande :
    ```bash
    npm install
    OU
    yarn install
    ```

## Lancement du projet
1. Lancer cette commande :
    ```bash
    npm run dev
    OU
    yarn run dev
    ```
2. Ouvrir votre navigateur et aller à l'adresse suivante : [http://localhost:5173/](http://localhost:5173/)
3. Ajouter un jeu de donnée dans kibana (Si vous n'en avez pas, vous avez celui dans le dossier **Jeux de donnees** à la racine du projet de disponnible).

## Présentation des fonctionnalités
### Un écran d'acceuil
![alt text](image.png)

------
### Une page pour téléverser un jeu de donnée

Actuellement, le jeu de donnée est bien envoyé, cependant, il n'est pas correctement intégré sur elasticSearch. Nous vous conseillons de plutot passer par **kibana** pour ajouter un jeu de donnée.

![alt text](image-1.png)

------
### Une page de recherche simple

Cette page permet l'affichage du jeu de donnée sous forme d'un tableau avec une possibilité de filtrer sur un ou plusieurs champs. Peut importe le jeu de donnée, le tableau se mettra à jour avec les colonnes associés (et les filtres) au jeu de donnée.

![img.png](img.png)

![alt text](image-2.png)

------
### Une page d'aggregation

Cette page permet si le champ le permet de regrouper par type les données et indiquer le nombre total de données étant dans ce type.

![alt text](image-3.png)

## Section Logstash

### docker-compose.yml
    
```yml
version: '3.7'

services:
   elasticsearch:
      image: docker.elastic.co/elasticsearch/elasticsearch:8.13.4
      ports:
       - "9200:9200"
      environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      networks:
      - my_network

   logstash:
      image: docker.elastic.co/logstash/logstash:8.13.4
      volumes:
      - "./logstash.conf:/usr/share/logstash/pipeline/logstash.conf"
      networks:
      - my_network
      restart: always

networks:
   my_network:
   driver: bridge
```
### logstash.conf

```conf
input {
file {
path => "C:/Users/jbert/Documents/ISITECH/logstash/log/customer.json"
start_position => "beginning"
sincedb_path => "NUL"  # Utilisez "NUL" sous Windows pour ignorer sincedb
}
}

output {
file {
path => "C:/Users/jbert/Documents/ISITECH/logstash/log/logs.log"
codec => line { format => "%{message}" }
}
elasticsearch {
hosts => ["http://localhost:9200/"]
    index => "logstash-index"
}
stdout { codec => rubydebug }
}
```
