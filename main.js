// Concept de l'algorithme de Dijkstra
// L'algorithme de Dijkstra est utilisé pour trouver le chemin le plus court entre un point
// de départ (disons un sommet dans un graphe) et tous les autres points dans ce graphe. Un "graphe"
// est une collection de points connectés par des lignes. Chaque connexion a un poids, qui peut
// représenter une distance, un coût, etc.

// Comment cela fonctionne, étape par étape
// Imaginons que vous soyez dans une ville et que vous voulez trouver le chemin le plus court pour
// aller à toutes les autres villes. Voici comment Dijkstra fonctionne:

// Démarrez à la ville de départ : Notez la distance à cette ville comme 0 parce que vous y êtes déjà.
// Toutes les autres villes sont initialement notées avec une distance infinie, 
// parce que vous ne savez pas encore à quelle distance elles se trouvent.
// Visitez chaque ville : À chaque étape, choisissez la ville non visitée qui a la distance la plus
// courte enregistrée jusqu'à présent  (au début, ce sera votre ville de départ).
// Mise à jour des distances : Pour cette ville, regardez toutes les villes directement connectées.
//  Calculez la distance pour atteindre chacune de ces villes voisines en ajoutant la distance pour
//  atteindre la ville actuelle et le poids de la connexion. Si cette nouvelle distance est plus courte
//  que la distance précédemment enregistrée pour la ville voisine, mettez à jour la distance.
// Marquez la ville comme visitée : Une fois que toutes les connexions ont été examinées, marquez la ville comme "visitée",
//  ce qui signifie que vous n'allez pas revenir sur elle.
// Répétez : Continuez à faire cela pour chaque ville non visitée jusqu'à ce que toutes les villes aient été visitées.
// Exemple concret avec JavaScript
// Imaginons un graphe simple où les villes sont représentées comme des points (A, B, C, D) et les routes entre elles ont des distances.


const graph = {
   'A': { 'B': 4, 'C': 2 },
   'B': { 'A': 4, 'C': 5, 'D': 10 },
   'C': { 'A': 2, 'B': 5, 'D': 3 },
   'D': { 'B': 10, 'C': 3 }
};
// Dans cet exemple, il y a une route de la ville A à la ville B avec une distance de 4, et de A à C avec une distance de 2, etc.

// Fonction JavaScript pour Dijkstra
// Voici une fonction simplifiée de Dijkstra en JavaScript qui prend notre graphique et le sommet de départ pour calculer les distances minimales :

function dijkstra(graph, start) {
    // Crée un objet 'distances' pour stocker la distance la plus courte de 'start' à chaque nœud
    const distances = {};
    // Crée un ensemble 'visited' pour suivre les nœuds qui ont été visités et traités
    const visited = new Set();

    // Initialise les distances de tous les nœuds à 'Infinity' sauf le nœud de départ 'start'
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0; // La distance du nœud de départ à lui-même est toujours 0

    // Commence à explorer le graphe à partir du nœud de départ
    let current = start;
    while (current) { // Continue tant qu'il y a un nœud 'current' à traiter
        let dist = distances[current]; // Distance actuelle du nœud de départ à 'current'
        let neighbors = graph[current]; // Objets contenant les voisins de 'current' et leurs poids

        // Boucle sur chaque voisin de 'current'
        for (let neighbor in neighbors) {
            if (!visited.has(neighbor)) { // Si le voisin n'a pas encore été visité
                let newDist = dist + neighbors[neighbor]; // Calcule la nouvelle distance pour le voisin
                if (newDist < distances[neighbor]) { // Si la nouvelle distance est plus courte
                    distances[neighbor] = newDist; // Met à jour la distance dans l'objet 'distances'
                }
            }
        }

        // Ajoute 'current' à l'ensemble des nœuds visités
        visited.add(current);

        // Prépare à traiter le prochain nœud
        current = null;
        let smallest = Infinity;
        // Trouve le nœud non visité avec la plus petite distance enregistrée
        for (let node in distances) {
            if (!visited.has(node) && distances[node] < smallest) {
                smallest = distances[node];
                current = node; // 'current' est maintenant le nœud avec la plus petite distance
            }
        }
    }
    // Retourne l'objet 'distances' qui contient la distance minimale de 'start' à chaque nœud
    return distances;
}

// Comment utiliser cette fonction
// Vous utilisez cette fonction en lui donnant le graphe et en indiquant par où commencer. Par exemple, 
// dijkstra(graph, 'A') vous donnera les distances les plus courtes de A à tous les autres points.



const shortestPathsFromA = dijkstra(graph, 'A');
console.log(shortestPathsFromA);

// Regardons chaque partie de cet objet :
// Structure Générale
// const graph = {
//    'A': { 'B': 4, 'C': 2 },
//    'B': { 'A': 4, 'C': 5, 'D': 10 },
//    'C': { 'A': 2, 'B': 5, 'D': 3 },
//    'D': { 'B': 10, 'C': 3 }
// };
// Détails des Sommets et de leurs Connexions
// Sommet 'A'
// Connecté à 'B' avec un poids de 4.
// Connecté à 'C' avec un poids de 2.
// Signification : Il y a une route de 'A' à 'B' qui coûte 4 unités (distance, temps, ou autre mesure de coût). Il y a aussi une route de 'A' à 'C' qui coûte 2 unités.
// Sommet 'B'
// Connecté à 'A' avec un poids de 4.
// Connecté à 'C' avec un poids de 5.
// Connecté à 'D' avec un poids de 10.
// Signification : 'B' est directement connecté à 'A' (4 unités), à 'C' (5 unités), et à 'D' (10 unités). Cela montre les options directes de déplacement à partir de 'B'.
// Sommet 'C'
// Connecté à 'A' avec un poids de 2.
// Connecté à 'B' avec un poids de 5.
// Connecté à 'D' avec un poids de 3.
// Signification : De 'C', il y a des routes directes vers 'A' (2 unités), 'B' (5 unités), et 'D' (3 unités). 'C' est un point central bien connecté à tous les autres sommets du graphe.
// Sommet 'D'
// Connecté à 'B' avec un poids de 10.
// Connecté à 'C' avec un poids de 3.
// Signification : 'D' a des connexions directes vers 'B' et 'C'. 'D' n'est pas connecté directement à 'A', ce qui signifie que pour atteindre 'A' à partir de 'D', il doit passer par 'B' ou 'C'.
// Comment Interpréter Cette Structure
// Cet objet graphique vous permet de visualiser facilement quels points peuvent se connecter directement et combien cela "coûte" de se déplacer entre eux. Par exemple, pour trouver le coût de se déplacer du point 'A' au point 'D', vous devez chercher le chemin qui minimise ce coût, en utilisant potentiellement des sommets intermédiaires comme 'B' ou 'C'.
// Utilité en Programmation
// En JavaScript et dans les algorithmes graphiques comme celui de Dijkstra, cette structure d'objet est extrêmement utile pour représenter des graphes de manière simple et accessible, permettant de manipuler facilement les données pour trouver des chemins, des coûts de déplacement, etc.
// Cet objet graph est donc une représentation fondamentale pour appliquer des algorithmes de traitement de graphe, et c'est sur cette structure que vous pouvez appliquer l'algorithme de Dijkstra pour trouver le chemin le plus court entre des sommets dans un graphe.