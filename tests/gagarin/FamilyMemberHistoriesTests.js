describe('clinical:hl7-resources-family-memory-history', function () {
  var server = meteor();
  var client = browser(server);

  it('FamilyMemberHistory should exist on the client', function () {
    return client.execute(function () {
      expect(FamilyMemberHistory).to.exist;
    });
  });

  it('FamilyMemberHistory should exist on the server', function () {
    return server.execute(function () {
      expect(FamilyMemberHistory).to.exist;
    });
  });

});
