<h1>Hello, this is my project where you can create a profile in which you can write information about yourself, upload your certificates, and send them to friends and employers.</h1>

<h2>1. Register</h2>
<p>Here you can register and your information will be stored in a MongoDB database. The password is hashed, and there is validation for each required input. If the rules are not followed, an error message will appear in the respective field. If there is a server error, the error will be displayed next to the button. When the mouse hovers over a field, information on what needs to be entered will appear. After a successful registration, you remain logged into the new account.</p>
<img src="./readmeImage/Register.jpg" alt="registerFoto">

<h2>2. Profil</h2>
<p>This section contains more details about the profile, including all the information the user has provided. You can see the certificates the user has, and if you are the profile owner, you can edit your profile information. If you are not the owner, the 'Edit' button will not be visible to you.</p>
<img src="./readmeImage/MyProfil.jpg" alt="Profil Photo">

<h2>3. Other profil and likes</h2>
<p>This section is visible when a logged-in user views another user's profile. Depending on whether the logged-in user has liked the profile, the button will toggle between "Like" and "Unlike." Access to this information does not require registration. However, if the user is a guest and not logged in, the button will not be displayed.</p>
<img src="readmeImage/OtherProfil.png" alt="otherProfil Photo">

<h2>4. Add Certificate</h2>
<p>Here you can create a new certificate, and there is validation for each field. When the mouse hovers over a field, information on what needs to be entered in that field is displayed. Upon successful creation, you are redirected to all your certificates. The certificates are stored in the database and are linked to your profile.</p>
<img src="./readmeImage/AddCertificate.png" alt="Add Certificate Image">

<h2>5. Certificates</h2>
<p>Here you can view all the certificates uploaded by all users. Each page displays 8 certificates, and when there are more than 8, a new page is created. Only the certificates designated for the current page are loaded. If you haven't uploaded a photo or if the photo cannot be loaded, it will be replaced with a placeholder image indicating that no photo is available.</p>
<img src="./readmeImage/Certificates.jpg" alt="certificatePhoto">

<h2>6. Certificate Detail</h2>
<p>Here you will find more information about certificate, and if you are the creator, you will be able to edit or delete it.</p>
<img src="./readmeImage/DetailCertificate.jpg" alt="detailFoto">

<h2>7. Edit Certificate<h2>
<p>Here you can edit your certificate, with the fields automatically populated with your previous data. The fields have the same validations and functionalities as when you first added the certificate.</p>
<img src="./readmeImage/EditCertificate.jpg" alt="EditCertificate Photo">


