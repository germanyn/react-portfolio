import 'reactjs-mtg-card/dist/index.css'
import { MagicCard, CardProps } from 'reactjs-mtg-card'

export type GermanoCardProps = {
    language: 'pt' | 'en'
}

const GermanoCard: React.FC<GermanoCardProps> = ({ language }) => {

    const content: CardProps = language === 'en'
        ? {
            descriptions: ["{1}{U}: Target programmer can't be blocked until end of turn"],
            flavorText: [ '"Sanity test!"' ],
            type: 'Creature \u2013 Human Developer',
        }
        : {
            descriptions: ['{1}{U}: Programador alvo não pode ser bloqueado até final do turno'],
            flavorText: [ '"Teste de sanidade!"' ],
            type: 'Criatura \u2013 Humano Desenvolvedor',
        }

    return (
        <MagicCard
            cardColor='blue'
            name='Germano Gascho'
            manaCost='{1}{U}'
            artUrl="https://avatars.githubusercontent.com/u/35080245?s=400&u=12342e8d1aedc558809a8c5464e2ebf653efc9ab&v=4"
            fotterRightText={[
                '&#x99; &amp; &#169; 2021 Germano Gascho',
            ]}
            {...content}
        />
    )
}

export default GermanoCard
