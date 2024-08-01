const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

(async function testLogin() {
    // Configura el WebDriver para Microsoft Edge
    let options = new edge.Options();
    let driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();

    try {
        console.log('Navegando a la URL...');
        await driver.get('http://localhost:3000/index.html');

        console.log('Esperando que el formulario esté cargado...');
        await driver.wait(until.elementLocated(By.id('loginForm')), 10000);

        console.log('Rellenando el formulario...');
        let emailField = await driver.findElement(By.id('email')); // Usa el id 'email'
        let passwordField = await driver.findElement(By.id('password')); // Usa el id 'password'
        let loginButton = await driver.findElement(By.css('button.login')); // Usa la clase 'login' para el botón

        await emailField.sendKeys('testuser@example.com');
        await passwordField.sendKeys('testpassword');
        await loginButton.click();

        console.log('Esperando el resultado...');
        await driver.sleep(5000); // Espera 5 segundos para que el formulario se procese

        // Aquí podrías verificar algún resultado esperado si hay alguna respuesta visible
        console.log('Test completado');
    } catch (error) {
        console.error('Test encountered an error:', error);
    } finally {
        console.log('Cerrando el navegador...');
        await driver.quit();
    }
})();
