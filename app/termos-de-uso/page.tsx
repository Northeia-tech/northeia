import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout, { COMPANY_CNPJ, FORO, List, MailLink, Section } from '../_components/LegalLayout'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Condições para o uso do site da Northeia (northeia.com.br).',
  alternates: { canonical: '/termos-de-uso' },
}

export default function TermosDeUso() {
  return (
    <LegalLayout
      current="termos"
      title="Termos de Uso"
      intro="Estas são as regras para usar o site northeia.com.br. Ao navegar por ele ou entrar em contato conosco, você concorda com as condições abaixo."
    >
      <Section title="1. Aceitação dos termos">
        <p>
          Estes Termos de Uso regulam o acesso e a utilização do site da Northeia (“Northeia”, “nós”).
          {COMPANY_CNPJ ? ` CNPJ: ${COMPANY_CNPJ}.` : ''} Se você não concordar com alguma condição, pedimos que não
          utilize o site.
        </p>
      </Section>

      <Section title="2. O que é este site">
        <p>
          O site apresenta a Northeia, sua forma de trabalhar e os serviços que oferece em estratégia, dados e
          tecnologia, e permite que você entre em contato conosco. O conteúdo tem caráter informativo e não
          constitui proposta comercial, consultoria específica ou recomendação para o seu caso concreto.
        </p>
      </Section>

      <Section title="3. Serviços contratados à parte">
        <p>
          A prestação de qualquer serviço depende de proposta ou contrato próprio, no qual constarão escopo, prazos,
          valores e demais condições. O envio de um formulário ou email e a realização de uma primeira conversa não
          criam, por si só, obrigação de contratar para nenhuma das partes.
        </p>
      </Section>

      <Section title="4. Uso adequado do site">
        <p>Ao usar o site, você se compromete a não:</p>
        <List
          items={[
            'praticar atos ilícitos ou que violem direitos de terceiros;',
            'tentar acessar áreas restritas, burlar medidas de segurança ou sobrecarregar a infraestrutura;',
            'introduzir vírus, códigos maliciosos ou qualquer recurso que possa danificar o site ou os sistemas de terceiros;',
            'usar robôs, scrapers ou meios automatizados para coletar conteúdo ou dados sem a nossa autorização;',
            'se passar por outra pessoa ou empresa, ou fornecer informações falsas em nossos formulários.',
          ]}
        />
      </Section>

      <Section title="5. Propriedade intelectual">
        <p>
          O nome e a marca Northeia, o logotipo, os textos, o design, as ilustrações e os demais elementos do site
          pertencem à Northeia ou são usados com autorização. É proibido copiar, reproduzir, modificar ou distribuir
          esse material sem autorização prévia e por escrito, salvo nos limites permitidos em lei.
        </p>
      </Section>

      <Section title="6. Informações que você nos envia">
        <p>
          Você declara que as informações enviadas são verdadeiras e que tem o direito de compartilhá-las. Evite
          enviar pelo formulário dados pessoais de terceiros, dados sensíveis ou documentos confidenciais; se
          precisar compartilhar material desse tipo, combine antes conosco a forma adequada, inclusive a assinatura
          de um acordo de confidencialidade. O tratamento de dados pessoais segue a nossa{' '}
          <Link
            href="/politica-de-privacidade"
            className="border-b border-[#102F32]/40 text-[#102F32] transition-colors hover:border-[#E28A44] hover:text-[#B8651F]"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </Section>

      <Section title="7. Links para sites de terceiros">
        <p>
          O site pode conter links para páginas e serviços de terceiros. Não controlamos esses ambientes e não somos
          responsáveis pelo seu conteúdo, pelas suas políticas ou pelas suas práticas.
        </p>
      </Section>

      <Section title="8. Disponibilidade e limitação de responsabilidade">
        <p>
          Trabalhamos para manter o site no ar e com informações corretas, mas ele é oferecido no estado em que se
          encontra, sem garantia de funcionamento ininterrupto ou livre de erros. Na máxima extensão permitida pela
          lei, a Northeia não responde por danos decorrentes de indisponibilidade do site, de falhas de terceiros ou
          do uso das informações aqui publicadas como se fossem aconselhamento específico. Nada nestes Termos exclui
          responsabilidades que não possam ser excluídas por lei.
        </p>
      </Section>

      <Section title="9. Alterações">
        <p>
          Podemos alterar estes Termos e o próprio site a qualquer momento. A versão vigente é sempre a publicada
          nesta página, com a data da última atualização indicada no topo. O uso do site após a publicação de
          mudanças significa que você concorda com a nova versão.
        </p>
      </Section>

      <Section title="10. Lei aplicável e foro">
        <p>
          Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de{' '}
          {FORO} para resolver controvérsias deles decorrentes, ressalvados os casos em que a lei determine outro
          foro.
        </p>
      </Section>

      <Section title="11. Contato">
        <p>
          Dúvidas sobre estes Termos podem ser enviadas para <MailLink />.
        </p>
      </Section>
    </LegalLayout>
  )
}
