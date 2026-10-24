import type { Metadata } from 'next'
import LegalLayout, { COMPANY_CNPJ, List, MailLink, Section } from '../_components/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Saiba como a Northeia coleta, usa e protege seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).',
  alternates: { canonical: '/politica-de-privacidade' },
}

export default function PoliticaDePrivacidade() {
  return (
    <LegalLayout
      current="privacidade"
      title="Política de Privacidade"
      intro="Explicamos aqui, de forma direta, como a Northeia trata os dados pessoais de quem visita o site northeia.com.br ou entra em contato conosco, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)."
    >
      <Section title="1. Quem é o responsável pelos seus dados">
        <p>
          A Northeia (“Northeia”, “nós”) é a controladora dos dados pessoais tratados por meio deste site.
          {COMPANY_CNPJ ? ` CNPJ: ${COMPANY_CNPJ}.` : ''} Para qualquer assunto sobre esta Política ou sobre os seus
          dados, fale conosco pelo email <MailLink />.
        </p>
      </Section>

      <Section title="2. Quais dados coletamos">
        <p>
          <strong className="font-medium text-[#102F32]">Dados que você nos fornece</strong>, ao preencher o
          formulário de contato ou ao escrever para nós:
        </p>
        <List
          items={[
            'nome e email;',
            'empresa, cargo e telefone, quando você informar;',
            'o conteúdo da mensagem, incluindo qualquer informação que você decida compartilhar sobre o seu negócio.',
          ]}
        />
        <p>
          <strong className="font-medium text-[#102F32]">Dados coletados automaticamente</strong>, quando você
          navega pelo site:
        </p>
        <List
          items={[
            'endereço IP, tipo de navegador, sistema operacional e idioma;',
            'páginas visitadas, tempo de permanência e origem do acesso;',
            'identificadores de cookies e tecnologias semelhantes (veja a seção 6).',
          ]}
        />
        <p>
          Não precisamos de dados pessoais sensíveis (como saúde, origem racial ou étnica, convicção religiosa ou
          política) e pedimos que você não os envie em suas mensagens.
        </p>
      </Section>

      <Section title="3. Para que usamos seus dados e em que base legal">
        <List
          items={[
            <>
              <strong className="font-medium text-[#102F32]">Responder ao seu contato e conduzir a primeira
              conversa.</strong> Base legal: procedimentos preliminares relacionados a um possível contrato, a
              pedido do titular (art. 7º, V, da LGPD).
            </>,
            <>
              <strong className="font-medium text-[#102F32]">Enviar a confirmação de recebimento e acompanhar o
              seu contato</strong> em nosso sistema de relacionamento. Base legal: legítimo interesse (art. 7º, IX).
            </>,
            <>
              <strong className="font-medium text-[#102F32]">Enviar comunicações adicionais</strong>, como
              conteúdos e novidades, quando você tiver aceitado recebê-las. Base legal: consentimento (art. 7º, I),
              que pode ser retirado a qualquer momento.
            </>,
            <>
              <strong className="font-medium text-[#102F32]">Manter a segurança do site, prevenir fraudes e
              entender como ele é usado</strong> para melhorá-lo. Base legal: legítimo interesse (art. 7º, IX).
            </>,
            <>
              <strong className="font-medium text-[#102F32]">Cumprir obrigações legais e regulatórias</strong> e
              exercer direitos em processos. Base legal: art. 7º, II e VI.
            </>,
          ]}
        />
        <p>Não vendemos seus dados pessoais e não os usamos para decisões exclusivamente automatizadas.</p>
      </Section>

      <Section title="4. Com quem compartilhamos">
        <p>
          Compartilhamos dados apenas quando necessário para operar o site e atender você, com fornecedores que
          tratam os dados em nosso nome e sob nossas instruções:
        </p>
        <List
          items={[
            'HubSpot, para formulários, gestão de contatos (CRM) e envio de emails;',
            'provedores de hospedagem e infraestrutura do site;',
            'provedores de email e de ferramentas de produtividade que usamos no dia a dia.',
          ]}
        />
        <p>
          Também podemos compartilhar dados com autoridades públicas, quando houver obrigação legal ou ordem
          judicial.
        </p>
      </Section>

      <Section title="5. Transferência internacional de dados">
        <p>
          Alguns fornecedores, como o HubSpot, podem armazenar ou processar dados em servidores localizados fora do
          Brasil. Quando isso ocorre, buscamos fornecedores que ofereçam garantias adequadas de proteção, como
          cláusulas contratuais e padrões de segurança compatíveis com a LGPD (art. 33).
        </p>
      </Section>

      <Section title="6. Cookies e tecnologias semelhantes">
        <p>
          Cookies são pequenos arquivos gravados no seu navegador. Podemos usá-los para o funcionamento do site, para
          medir audiência e para reconhecer um contato que já preencheu um de nossos formulários, inclusive por meio
          de ferramentas como o HubSpot.
        </p>
        <p>
          Cookies de análise e de rastreamento só são ativados depois que você os aceita no aviso exibido na sua
          primeira visita. Você pode recusá-los (“Apenas essenciais”) e mudar de decisão a qualquer momento pelo link
          “Preferências de cookies”, no rodapé da página inicial.
        </p>
        <p>
          Você também pode bloquear ou apagar cookies nas configurações do seu navegador. Isso pode afetar algumas
          funcionalidades, como o preenchimento do formulário.
        </p>
      </Section>

      <Section title="7. Por quanto tempo guardamos seus dados">
        <p>
          Guardamos os dados pelo tempo necessário para as finalidades descritas nesta Política: enquanto durar a
          nossa conversa ou relação comercial e, depois, pelos prazos exigidos por lei ou necessários para o
          exercício regular de direitos. Contatos que não evoluem para uma relação comercial são eliminados ou
          anonimizados após um período razoável, ou antes, se você pedir.
        </p>
      </Section>

      <Section title="8. Seus direitos">
        <p>A LGPD garante a você, a qualquer momento e mediante pedido, o direito de:</p>
        <List
          items={[
            'confirmar se tratamos seus dados e acessá-los;',
            'corrigir dados incompletos, inexatos ou desatualizados;',
            'solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;',
            'pedir a portabilidade dos dados, nos termos da regulamentação;',
            'saber com quem compartilhamos seus dados;',
            'ser informado sobre a possibilidade de não consentir e sobre as consequências da recusa;',
            'revogar o consentimento e pedir a eliminação dos dados tratados com base nele;',
            'se opor a um tratamento feito com base em legítimo interesse, quando houver descumprimento da lei.',
          ]}
        />
        <p>
          Para exercer qualquer um desses direitos, escreva para <MailLink />. Podemos pedir informações para
          confirmar a sua identidade antes de atender ao pedido, e responderemos no menor prazo possível.
        </p>
      </Section>

      <Section title="9. Como protegemos seus dados">
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acesso não autorizado,
          perda, alteração e divulgação indevida, como conexão criptografada (HTTPS), controle de acesso e uso de
          fornecedores reconhecidos. Nenhum sistema é totalmente imune a falhas; se ocorrer um incidente de
          segurança que possa gerar risco ou dano relevante a você, comunicaremos você e a Autoridade Nacional de
          Proteção de Dados (ANPD), conforme a lei.
        </p>
      </Section>

      <Section title="10. Crianças e adolescentes">
        <p>
          Este site é voltado a pessoas e empresas, e não a menores de 18 anos. Não coletamos intencionalmente dados
          de crianças e adolescentes. Se você acredita que isso ocorreu, avise-nos para que possamos excluir as
          informações.
        </p>
      </Section>

      <Section title="11. Alterações desta Política">
        <p>
          Podemos atualizar esta Política para refletir mudanças em nossos serviços ou na legislação. A data da última
          atualização aparece no topo da página, e mudanças relevantes serão destacadas no site.
        </p>
      </Section>

      <Section title="12. Fale conosco e reclamações">
        <p>
          Dúvidas, pedidos e reclamações sobre privacidade podem ser enviados para <MailLink />. Você também tem o
          direito de apresentar petição à Autoridade Nacional de Proteção de Dados (ANPD), em gov.br/anpd.
        </p>
      </Section>
    </LegalLayout>
  )
}
