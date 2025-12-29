import React, { useContext, useCallback } from 'react';
import { ChatContext } from '../context/ChatContext';

const ContactItem = React.memo(({ contact }) => {
const { activeContactId, setActiveContactId } = useContext(ChatContext);

const handleClick = useCallback(() => {
setActiveContactId(contact.id);
}, [contact.id, setActiveContactId]);

return (
<li
className={`contact-item ${
activeContactId === contact.id ? 'active' : ''
}`}
onClick={handleClick}
>
{contact.name}
</li>
);
});

// Add display name for better debugging
ContactItem.displayName = 'ContactItem';

export default ContactItem;