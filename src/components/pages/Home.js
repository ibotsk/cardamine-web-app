import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

const Home = () => (
  <Grid className="text-justify">
    <Row>
      <Col>
        <h3>Database</h3>
        <p>
          CardamBase – Datababase of names, chromosome numbers and ploidy levels
          of the genus Cardamine
        </p>
        <p>
          Database of names and published chromosome numbers and ploidy-level
          estimates of the genus Cardamine (to be later extended to the whole
          tribe Cardamineae) is presented.  The database comprises the list of
          accepted names and their synonyms (including places of publication,
          type localities, and type specimens, wherever information is
          available) reflecting the most recent taxonomic and phylogenetic
          studies in this genus.
        </p>
        <p>
          Currently the database includes almost 300 accepted names of species
          and infraspecific taxa, altogether 946 names of taxa, including
          synonyms.
        </p>
        <p>
          It also includes data on 3701 chromosome number records, 750 DNA
          ploidy level records and 150 genome size records.
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <h3>Recommended citation</h3>
        <p>
          Karol Marhold, Matúš Kempa, Jaromír Kučera, Katarína Skokanová, Janka
          Smatanová, Barbora Šingliarová, Marek Šlenker, Judita Lihová-Zozomová
          (2021+): CardamBase – Datababase of names, chromosome numbers and
          ploidy levels of the genus Cardamine. Available at:
          https://cardamine.sav.sk
        </p>
      </Col>
    </Row>
  </Grid>
);

export default Home;
