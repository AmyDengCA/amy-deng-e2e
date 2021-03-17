//Amy-Deng-e2e

describe('Youtube E2E testing', () => {
  it('Search a specific video on youtube', () => {

    const url='https://www.youtube.com'
    const videoTitle='The whole working-from-home thing — Apple'
    const channelName='Apple'
    const channelNameRegex= new RegExp('^' + channelName + '$')

    //visit youtube.com
    cy.visit(url)

    //Type 'The whole working-from-home thing — Apple' in the search field
    cy.get('#search-input').type(videoTitle)

    //Click on search button
    cy.get('#search-icon-legacy').click()

    //Click on this video
    cy.get('#channel-info .yt-simple-endpoint').contains(channelNameRegex)
    .parentsUntil('ytd-item-section-renderer')
    .find('[title="' + videoTitle + '"]')
    .click()

    //Wait for page to load
    cy.get('.html5-main-video').should('have.attr', 'src')

    //Assert that the title of the video matches what user searched for previously 
    cy.get('.title .ytd-video-primary-info-renderer').should('have.text', videoTitle)

    //Assert that the uploader is indeed “Apple”
    cy.get('#upload-info .yt-simple-endpoint').should('have.text', channelName)

  })
})


