# Демо міграція alembic
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'demo_table',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False)
    )

def downgrade():
    op.drop_table('demo_table')
