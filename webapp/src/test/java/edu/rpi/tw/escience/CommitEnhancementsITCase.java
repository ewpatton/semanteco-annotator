package edu.rpi.tw.escience;

import java.io.File;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;

import edu.rpi.tw.escience.semanteco.test.SemantEcoITCase;
import static org.junit.Assert.*;

/**
 * Tests that the Annotator will return valid Turtle documents for both the
 * enhancement parameters and the converted data when a file is loaded and the
 * "Commit Enhancements" button is pressed.
 * @author ewpatton
 *
 */
@RunWith(Parameterized.class)
public class CommitEnhancementsITCase extends SemantEcoITCase {

    /**
     * Identifies the Selenium drivers to use for this test. Currently there
     * seem to be issues with drivers other than Firefox.
     * @return
     */
    @SuppressWarnings("rawtypes")
    @Parameters
    public static Collection<Class[]> drivers() {
        return listDrivers(FirefoxDriver.class);
    }

    static final String SOURCE = "source_info";
    static final String DATASET_NEW = "dataset_add_new";
    static final String VERSION = "version_info";
    static final String COMMIT_ENHANCEMENT = "menu-commit-enhancement";

    /**
     * Constructor for parameterized test. It is needed to tell the parent
     * class what type of Selenium driver to initialize.
     * @param driver
     */
    public CommitEnhancementsITCase(Class<? extends WebDriver> driver) {
        super( driver );
    }

    @Test
    public void testCommitEnhancements() throws InterruptedException {
        // browse to the annotator
        driver.get("http://localhost:9999/annotator/");
        assertEquals("Semantic Annotator", driver.getTitle());

        // open the import file dialog
        WebElement button = driver.findElement(By.id("menu-import-file"));
        assertClickable( button );
        button.click();

        // select the file
        button = driver.findElement(By.id("the_file"));
        assertClickable( button );
        String pathToFile = getPathForTestResource( "countrylist.csv" );
        assert( new File(pathToFile).exists() );
        button.sendKeys( pathToFile );
        button = findButtonWithText("Import");
        assertClickable( button );
        button.click();

        // set the source to tw.rpi.edu
        Select select = new Select( driver.findElement( By.id( SOURCE ) ) );
        select.selectByValue("tw.rpi.edu");

        // set the dataset to "countries"
        WebElement text = driver.findElement( By.id( DATASET_NEW ) );
        text.sendKeys( "countries" );
        text = driver.findElement( By.id( VERSION ) );

        // test that the last modified date of the file was automatically detected
        assertEquals( getLastModifiedDate( pathToFile ),
                text.getAttribute( "value" ) );
        button = findButtonWithText( "Ok" );
        assertClickable( button );
        button.click();

        // commit the enhancements
        button = driver.findElement( By.id( COMMIT_ENHANCEMENT ) );
        assertClickable( button );
        button.click();

        // this may need to be adjusted for slower machines
        Thread.sleep(5000);

        // verify that the download manager contains the new <a> elements
        WebElement downloadManager = driver.findElement( By.id( "download-manager" ) );
        //driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
        Thread.sleep(60000);
        List<WebElement> dlLinks = downloadManager.findElements( By.tagName( "a" ) );
        assertEquals( 2, dlLinks.size() );

        // check each link for a valid turtle document using Jena
        for ( WebElement el : dlLinks ) {
            String target = resolveLink( el );
            System.out.println( "url = " + target );
            Model m = ModelFactory.createDefaultModel();
            m.read( target, "TTL" );
            m.close();
        }
    }
}
