// import React from 'react'

// function PNPHome() {
//   console.log(">>>>>>>>>>>> PNP Home <<<<<<<<<<<<<<<<<<<");
//   return (
//    <>
//       <div>
//       Hello !!!
//       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga expedita dolores quasi eveniet consequatur blanditiis magnam ipsam eum sed ipsa fugiat nisi maiores odio iste ipsum, at possimus delectus sunt unde ratione in porro! Perferendis quam et ipsa modi, aut repudiandae placeat, obcaecati incidunt consequuntur harum illo omnis architecto molestiae dicta impedit! Accusamus maiores voluptatibus ut, amet provident earum quos ad fugit nihil quod dicta, reprehenderit voluptate aliquam est illum hic necessitatibus expedita soluta. Ipsum, aut aspernatur veritatis nulla libero sit, maxime veniam, accusantium tempora labore dolorum dolore eaque magni dolores! Dolorum illo aspernatur expedita quos deleniti incidunt fuga. Placeat voluptatibus autem, illum blanditiis, nostrum corrupti fugit praesentium minus aut fugiat repellat dolores odio maiores cum architecto, libero quasi dignissimos eos dolorem. In debitis neque, natus ipsum nobis reiciendis et, voluptates veniam deleniti impedit quasi rerum, optio ipsa amet quo autem? Beatae deserunt aspernatur ipsa placeat quis nemo, sapiente, inventore commodi exercitationem maxime obcaecati recusandae molestiae et ullam officia quam aperiam distinctio quos vel non nesciunt rem animi eligendi. Impedit quam harum repudiandae fugiat officiis? Doloremque quas architecto, praesentium quidem beatae minima aspernatur voluptatem consectetur accusantium quisquam perferendis assumenda vitae porro veritatis pariatur qui excepturi quo ratione. Consequatur quibusdam, nam dicta, voluptate, exercitationem laborum cum totam illum temporibus nihil fuga porro natus a! Maiores reprehenderit, praesentium officia incidunt ex facilis eligendi modi, repellat enim doloremque natus rerum tenetur labore! Nobis dolorem sit expedita omnis. Labore facere ab similique recusandae eveniet. Veritatis earum atque, odit temporibus officiis nulla ipsa, et mollitia enim tempore modi sequi delectus, incidunt explicabo. Voluptatum officia accusantium repellat tenetur expedita corrupti assumenda dolores dolor fugiat error architecto nisi nihil beatae, quisquam tempore iste quas quidem enim eum recusandae? Ipsam dolorum atque cupiditate nihil tempore, recusandae id voluptatem distinctio? Consectetur vel eius qui animi, iusto, saepe veniam, id repellendus error sint voluptatibus nesciunt nobis quae consequatur ratione mollitia nulla impedit. Rem, voluptatum consequuntur quisquam ea ex eligendi dicta tempora molestias, numquam maxime facilis cupiditate asperiores nisi obcaecati? Saepe nostrum, facilis soluta veniam architecto ab, provident molestiae illum rem eligendi iste voluptate. Qui, ad. Incidunt dolore expedita nisi itaque reprehenderit, corporis quo praesentium quas veritatis, iusto atque error in fugiat. Culpa quod consectetur accusamus saepe nobis esse pariatur voluptas recusandae autem porro, ut, ex eos facere. Adipisci fugit expedita assumenda eaque suscipit molestiae architecto illum dolor, eius quod repellat ut. Odio, doloribus incidunt. Voluptatem voluptas odit, consectetur earum, alias enim minima culpa eum officiis itaque rem unde sit velit quam! Magnam consectetur sequi praesentium dolorem veritatis veniam velit nam tempore voluptatibus cupiditate, minima eos neque amet in tempora aperiam sit minus! Doloremque explicabo ab unde quasi, pariatur et neque necessitatibus quaerat voluptas quo inventore blanditiis quisquam atque illum officiis beatae mollitia, eaque illo autem repellat tempore vero. Quisquam id recusandae, quidem cupiditate fugiat ullam dolorum cumque temporibus nulla beatae hic est pariatur optio culpa unde labore perferendis aspernatur facere porro molestiae eveniet exercitationem repudiandae cum obcaecati? Nam quo tenetur vitae debitis vel cum. Repudiandae rerum saepe magnam quod obcaecati.
//     </div>
    
//    </>
//   )
// }

// export default PNPHome

// import React from 'react';
// import styles from './PNPHome.module.scss';
// import { Col } from 'reactstrap';
// import { FormattedMessage } from 'react-intl';


// function PNPHome({ user }) {
//   console.log("User in PNPHome:", user);



//   return (
//     <>
//       <div className="p-3 lg:ml-64 z-10 static" style={{ marginTop: "60px" }}>
//         <div className={styles.welcome}>
//           <Col md="9" className="display-3" role="heading" aria-level={1}>
//             <FormattedMessage 
//               id="pnp.home.hi" 
//             />
//             {user.username}
//             <br />
//           </Col>
//         </div>
//       </div>
//     </>
//   );
// }






// export default PNPHome;

// import React from 'react';
// import styles from './PNPHome.module.scss';
// import { Col } from 'reactstrap';


// function PNPHome({ user }) {
//   console.log("User in PNPHome:", user);

//   return (
//     <div className="p-3 lg:ml-64 z-10 static" style={{ marginTop: "60px" }}>
//       <div className={styles.welcome}>
//         <Col md="9" className="display-3" role="heading" aria-level={1}>
//           {user.username}
//           <br />
//         </Col>
//       </div>
//     </div>
//   );
// }

// export default PNPHome;


// import React from 'react';
// import { useIntl } from 'react-intl';
// import { Col, Row } from 'reactstrap';
// import styles from './PNPHome.module.scss';
// import ActionCard from '../../components/ActionCard/ActionCard';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { RESOURCE } from '../../utils/constants';
// import { PNPRoles } from '../../utils/Enums';

// const ROLES_ALLOWED_FOR_REPORT = [
//   RESOURCE + PNPRoles.OWNER,
//   RESOURCE + PNPRoles.PUBLISHER,
//   RESOURCE + PNPRoles.CORRESPONDENT,
//   RESOURCE + PNPRoles.SUPERUSER,
//   RESOURCE + PNPRoles.OVER_SIGHT,
//   RESOURCE + PNPRoles.CENTRAL_APPROVER,
//   RESOURCE + PNPRoles.LOCAL_APPROVER,
// ];


// function PNPHome({ user }: { user: { username: string } }) {
//   const { formatMessage } = useIntl();
//   const navigate = useNavigate(); // Initialize navigate function

//   return (
//     <div className="p-3 lg:ml-64 z-10 static" style={{ marginTop: "70px" }}>
//       <div className={styles.welcome}>
//         <Col md="12">
//           <div className={styles.greeting}>
//             {formatMessage({ id: 'pnp.home.hi' })} {user?.username}!
//           </div>
//           <div className={styles.subtext}>
//             {formatMessage({ id: 'pnp.home.welcome' })}{' '}
//             <span className={styles.highlight}>MyP&P</span>
//           </div>
//         </Col>
//       </div>

//       <div className={styles.flexContainer}>
//         <Row className='mt-5'>
//         <ActionCard 
//       id='my-pending-action'
//       title={formatMessage({ id: 'pnp.mypnp.pendingActions' })}
//       subtitle="Pending Action item to be approved"
//       icon='Pending_actions'
//       backgroundColor='#fcf3ee'
//       color='#6e777a'
//       onClick={() => {
//         navigate('/pnp/my-pending-action'); // Correct usage of navigate
//       }}
//     />

// <ActionCard 
//       id='my-pnp-scope'
//       title={formatMessage({ id: 'pnp.home.myPnP' })}
//       subtitle="Pending Action item to be approved"
//       icon='list_alt'
//       backgroundColor='#e9f0ff'
//       color='#2469ff'
//       onClick={() => {
//         navigate('/pnp/mynp'); // Correct usage of navigate
//       }}
//     />
//         </Row>
//       </div>

//     </div>
//   );
// }

// export default PNPHome;


import React from 'react';
import { useIntl } from 'react-intl';
import { Col, Row } from 'reactstrap';
import styles from './PNPHome.module.scss';
import ActionCard from '../../components/ActionCard/ActionCard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { RESOURCE } from '../../utils/constants';
import { PNPRoles } from '../../utils/Enums';

const ROLES_ALLOWED_FOR_REPORT = [
  RESOURCE + PNPRoles.OWNER,
  RESOURCE + PNPRoles.PUBLISHER,
  RESOURCE + PNPRoles.CORRESPONDENT,
  RESOURCE + PNPRoles.SUPERUSER,
  RESOURCE + PNPRoles.OVER_SIGHT,
  RESOURCE + PNPRoles.CENTRAL_APPROVER,
  RESOURCE + PNPRoles.LOCAL_APPROVER,
];

function PNPHome({ user }: { user: { username: string } }) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="p-3 lg:ml-64 z-10 static" style={{ marginTop: "70px" }}>
      <div className={styles.welcome}>
        <Col md="12">
          <div className={styles.greeting}>
            {formatMessage({ id: 'pnp.home.hi' })} {user?.username}!
          </div>
          <div className={styles.subtext}>
            {formatMessage({ id: 'pnp.home.welcome' })}{' '}
            <span className={styles.highlight}>MyP&P</span>
          </div>
        </Col>
      </div>

      <div className={styles.flexContainer}>
        <div className={styles.columns}>
          <ActionCard 
            id='my-pending-action'
            title={formatMessage({ id: 'pnp.mypnp.pendingActions' })}
            subtitle="Pending Action item to be approved"
            icon='Pending_actions'
            backgroundColor='#fcf3ee'
            color='#6e777a'
            onClick={() => {
              navigate('/pnp/my-pending-action'); // Correct usage of navigate
            }}
          />
          </div>
          <div className={styles.columns}>
          <ActionCard 
            id='my-pnp-scope'
            title={formatMessage({ id: 'pnp.home.myPnP' })}
            subtitle="Pending Action item to be approved"
            icon='list_alt'
            backgroundColor='#e9f0ff'
            color='#2469ff'
            onClick={() => {
              navigate('/pnp/mypnp-scope'); // Correct usage of navigate
            }}
          />
          </div>
          {/* Add more ActionCard components as needed */}
          <div className={styles.columns}>
          <ActionCard 
            id='mypnp-dispensation-list'
            title={formatMessage({ id: 'pnp.home.myRequests' })}
            subtitle="New Action item"
            icon='edit'
            backgroundColor='#f3f4f6'
            color='#333'
            onClick={() => {
              navigate('/pnp/mypnp-dispensation-list'); // Correct usage of navigate
            }}
          />
          </div>
          <div className={styles.columns}>
          <ActionCard 
            id='dashboard'
            title={formatMessage({ id: 'pnp.home.pnpdashboard' })}
            subtitle="Archived Action item"
            icon="edit"
            backgroundColor='#e0e0e0'
            color='#555'
            onClick={() => {
              navigate('/pnp/my-archived-action'); // Correct usage of navigate
            }}
          />
        </div>
        <div className={styles.columns}>
          <ActionCard 
            id='repository'
            title={formatMessage({ id: 'pnp.home.repository' })}
            subtitle="Archived Action item"
            icon='edit'
            backgroundColor='#e0e0e0'
            color='#555'
            onClick={() => {
              navigate('/pnp/my-archived-action'); // Correct usage of navigate
            }}
          />
        </div>
        <div className={styles.columns}>
          <ActionCard 
            id='my-archived-action'
            title={formatMessage({ id: 'pnp.home.archivedAction' })}
            subtitle="Archived Action item"
            icon='archived_action_icon'
            backgroundColor='#e0e0e0'
            color='#555'
            onClick={() => {
              navigate('/pnp/my-archived-action'); // Correct usage of navigate
            }}
          />
        </div>
      </div>

      
    </div>
  );
}

export default PNPHome;
