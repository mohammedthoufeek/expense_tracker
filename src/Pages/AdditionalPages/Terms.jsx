import {Link} from 'react-router-dom';
import { Body, TermsAcceptButton, TermsPageContant, TermsPageHeader } from '../Style';
function Terms (){
    return (
      <>
        <Body>
          <TermsPageHeader>
            <h2>Terms and Conditions</h2>
          </TermsPageHeader>
          <TermsPageContant>
            <h2>
              Yet not Decided... <span>😅</span>
            </h2>

            <Link to="/profile">
              <TermsAcceptButton >I Accept</TermsAcceptButton>
            </Link>
          </TermsPageContant>
        </Body>
      </>
    );
}
export default Terms