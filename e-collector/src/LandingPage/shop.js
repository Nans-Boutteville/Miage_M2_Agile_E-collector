import React from 'react';


export default class Shop extends React.Component {
    render(){
        return(
            <footer>
                <div className="classfeatured-image-block-grid">
                    <div>
                        <h2  id="text-align-center" >E-Collect la poubelle connecté </h2>
                        <img src={require("../img/pages/Sans_titre_1.png")}></img>
                        <p>
                            On a tous déjà été au moins une fois dans un lieu public. Se balader, communier avec la nature, ou tout simplement prendre l’air. On a tous également déjà vu dans ces lieux publics, des poubelles pleines à ras bord qui n’ont pas été vidées, ou encore des déchets par terre. Dans un monde, qui aujourd’hui passe essentiellement par la propreté et le confort, cela est difficile à croire si on regarde ces lieux.  Alors on peut poser plusieurs questions :
                        </p>
                        <p>
                            pourquoi ces poubelles n’ont pas été vidé ? Pourquoi des personnes jettent des déchets par terre. Est-ce parce que les hommes d’entretiens sont trop occupés sur d’autres lieux ? Est-ce qu’il n’y a pas assez de poubelles dans les lieux publics ? Est-ce à cause de l’éducation ? Est-ce que les poubelles sont trop éloignés des personnes voulant jeter des détritus ? Quelle solution pour diminuer ces déchets dans les lieux publics ?
                        </p>
                        <p>
                            Notre projet cherche donc à essayer de diminuer ce problème dans nos nombreux lieux public. Mais il pourra également agir dans d’autres lieux privés comme les parcs d’attraction.
                        </p>
                        <p>
                            Mais comment notre projet pourra diminuer les détritus par terre dans de tels lieux ? Tout simplement, en proposant une poubelle autonome. Un peu comme les robots aspirateurs qui sont apparus dans nos maisons récemment. Celle-ci pourra se déplacer de façon intelligente en fonction de chemins prédéfinis, ou en fonction de la fréquence de population dans les lieux publics. Celle-ci essayera de comprendre le comportement des personnes en se posant essentiellement une seule question : est-ce-que cette personne veut jeter un détritus ? Si oui, la poubelle se déplacera vers lui pour qu’il puisse jeter son détritus en faisant le moins d’efforts possible. Sinon elle continuera tout simplement son chemin. Ainsi cette poubelle pourra diminuer les détritus jeter par terre, en essayant de les récupérer avant qu’ils soient sur le sol.
                        </p>
                    </div>
                </div>
            </footer>
        )
    }
}